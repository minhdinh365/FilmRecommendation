using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using TrainAPI.Models;
namespace TrainAPI.Controllers
{
    public class HomeController : Controller
    {
        private IHttpClientFactory factory;
        private static FilmsModel[] fmd;
        private static MLContext mlContext;
        private static HttpClient client, clientPost;
        private static IDataView trainingDataView, testDataView;
        private static ITransformer model;

        public HomeController(IHttpClientFactory factory)
        {
            this.factory = factory;
        }


        public IActionResult SetValue()
        {
            mlContext = new MLContext();
            client = factory.CreateClient();
            fmd = new FilmsModel[1974];

            client.BaseAddress = new Uri("https://chom-phim.herokuapp.com");
            var response = client.GetAsync("/2000comments").Result;
            string jsonData = response.Content.ReadAsStringAsync().Result;

            ListFilm films = new ListFilm(jsonData);

            int i = -1;
            foreach (FilmsModel item in films.films)
            {
                i += 1;
                fmd[i] = new FilmsModel(item.id, item.username, item.title, item.evaluate, item.poster_path, item.run_time, item.release_date);
            }
            (trainingDataView, testDataView) = LoadData(mlContext, fmd);

            //model = BuildAndTrainModel(mlContext, trainingDataView);

            //EvaluateModel(mlContext, testDataView, model);

            //SaveModel(mlContext, trainingDataView.Schema, model);
            return View();
        }

        [EnableCors("MyPolicy")]
        [Route("home/predict/{id?}")]
        public IActionResult Index(string? id)
        {
            clientPost = factory.CreateClient();
            clientPost.BaseAddress = new Uri("https://chom-phim.herokuapp.com");
            var responseUser = clientPost.GetAsync("/evaluate?username=" + id).Result;
            string jsonUser = responseUser.Content.ReadAsStringAsync().Result;

            ListFilm user = new ListFilm(jsonUser);
            FilmsModel[] cmt = new FilmsModel[user.films.Count()];

            int j = -1;
            foreach (FilmsModel item in user.films)
            {
                j += 1;
                cmt[j] = new FilmsModel(item.id, item.username, item.title, item.evaluate, item.poster_path, item.run_time, item.release_date);
            }
            Response.StatusCode = 200;
            return Json(UseModelForSinglePrediction(mlContext, trainingDataView.Schema, fmd, cmt, id).Skip(24));
        }

        public static (IDataView training, IDataView test) LoadData(MLContext mlContext, FilmsModel[] films)
        {
            IDataView trainingDataView = mlContext.Data.LoadFromEnumerable<FilmsModel>(films);
            IDataView testDataView = trainingDataView;

            return (trainingDataView, testDataView);
        }

        public static ITransformer BuildAndTrainModel(MLContext mlContext, IDataView trainingDataView)
        {
            IEstimator<ITransformer> estimator = mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "userIdEncoded", inputColumnName: "username")
                .Append(mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "movieIdEncoded", inputColumnName: "id"));

            var options = new MatrixFactorizationTrainer.Options
            {
                MatrixColumnIndexColumnName = "userIdEncoded",
                MatrixRowIndexColumnName = "movieIdEncoded",
                LabelColumnName = "evaluate",
                NumberOfIterations = 800,
                ApproximationRank = 100
            };
            options.LossFunction = MatrixFactorizationTrainer.LossFunctionType.SquareLossOneClass;
            options.Alpha = 0.01;
            options.Lambda = 0.025;
            var trainerEstimator = estimator.Append(mlContext.Recommendation().Trainers.MatrixFactorization(options));

            ITransformer model = trainerEstimator.Fit(trainingDataView);

            return model;
        }

        public static void EvaluateModel(MLContext mlContext, IDataView testDataView, ITransformer model)
        {
            var prediction = model.Transform(testDataView);

            var metrics = mlContext.Regression.Evaluate(prediction, labelColumnName: "evaluate", scoreColumnName: "Score");
            Console.WriteLine("Root Mean Squared Error : " + metrics.RootMeanSquaredError.ToString());
            Console.WriteLine("RSquared: " + metrics.RSquared.ToString());
        }

        public static List<FilmsModel> UseModelForSinglePrediction(MLContext mlContext, DataViewSchema schema, FilmsModel[] testData, FilmsModel[] cmt, string username)
        {
            var modelPath = Path.Combine(Environment.CurrentDirectory, "Models", "MovieRecommenderModel.zip");
            var model = mlContext.Model.Load(modelPath, out schema);
            var predictionEngine = mlContext.Model.CreatePredictionEngine<FilmsModel, MovieRatingPrediction>(model);

            List<FilmsModel> result = new List<FilmsModel>();
            double[] index = new double[1974];

            Dictionary<string, int> list = new Dictionary<string, int>();
            list.Add("minhdinh123", 0);
            list.Add("minhdinh111", 0);
            list.Add("VinhVinh123", 0);
            list.Add("bangnguyen1234", 0);
            list.Add("minhdinh365", 0);
            list.Add("minhdinh364", 0);

            foreach (FilmsModel item in cmt)
            {
                var watched = testData.Where((val, idx) => val.id == item.id).ToArray();
                list[watched[0].username] = list[watched[0].username] + 1;
                testData = testData.Where((val, idx) => val.id != item.id).ToArray();
                Array.Resize(ref testData, 1974);
                testData[1973] = (new FilmsModel(item.id, item.username, item.title, item.evaluate, item.poster_path, item.run_time, item.release_date));
            }

            username = list.Aggregate((x, y) => x.Value > y.Value ? x : y).Key;

            for (int i = 0; i < 1974; i++)
            {
                if (testData[i].username != username)
                {
                    var testInput = new FilmsModel(testData[i].id, username, testData[i].title, 0, testData[i].poster_path, testData[i].run_time, testData[i].release_date);
                    var movieRatingPrediction = predictionEngine.Predict(testInput);
                    index[i] = (100 / (1 + Math.Exp(-Math.Round(movieRatingPrediction.Score, 1))));
                }
                else
                {
                    var testInput = new FilmsModel(testData[i].id, username, testData[i].title, testData[i].evaluate, testData[i].poster_path, testData[i].run_time, testData[i].release_date);
                    var movieRatingPrediction = predictionEngine.Predict(testInput);
                    index[i] = (100 / (1 + Math.Exp(-Math.Round(movieRatingPrediction.Score, 1))));
                }
            }
            double temp;
            int tempIndex;
            for (int i = 0; i < 36; i++)
            {
                temp = index.Max();
                tempIndex = index.ToList().IndexOf(temp);
                result.Add(testData[tempIndex]);
                testData = testData.Where((val, idx) => idx != tempIndex).ToArray();
                index = index.Where((val, idx) => idx != tempIndex).ToArray();
            }
            return result;
        }

        public static void SaveModel(MLContext mlContext, DataViewSchema trainingDataViewSchema, ITransformer model)
        {
            var modelPath = Path.Combine(Environment.CurrentDirectory, "Models", "MovieRecommenderModel.zip");

            mlContext.Model.Save(model, trainingDataViewSchema, modelPath);
        }
    }
}
