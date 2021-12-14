using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace TrainAPI.Models
{
    public class FilmsModel
    {
        public FilmsModel(int id, string username, string title, float evaluate, string poster_path, int run_time, string release_date)
        {
            this.id = id;
            this.title = title;
            this.username = username;
            this.evaluate = evaluate;
            this.poster_path = poster_path;
            this.run_time = run_time;
            this.release_date = release_date;

        }

        public int id { get; set; }

        public string title { get; set; }

        public int run_time { get; set; }

        public string release_date { get; set; }

        public string username { get; set; }

        public float evaluate { get; set; }
        public string poster_path { get; set; }
    }

    public class ListFilm
    {
        public ListFilm(string json)
        {
            films = new List<FilmsModel>();
            dynamic myObject = JValue.Parse(json);
            if (myObject.List.GetType().Name == "JArray")
            {
                foreach (dynamic film in myObject.List)
                {
                    films.Add(new FilmsModel((int)film.id_film, (string)film.id_info, (string)film.film.title, (float)film.evaluate, (string)film.film.poster_path, (int)film.film.run_time, (string)film.film.release_date));
                }
            }
        }
        
        public List<FilmsModel> films { get; set; }
    }

    public class MovieRatingPrediction
    {
        public float Label;
        public float Score;
    }
}
