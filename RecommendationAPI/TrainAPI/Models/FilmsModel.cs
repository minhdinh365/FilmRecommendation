using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace TrainAPI.Models
{
    public class FilmsModel
    {
        public FilmsModel(int id, string username, string title, float evaluate, string poster_path)
        {
            this.id = id;
            this.title = title;
            this.username = username;
            this.evaluate = evaluate;
            this.poster_path = poster_path;
        }

        public int id { get; set; }

        public string title { get; set; }
        
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
            foreach (dynamic film in myObject.List)
            {
                films.Add(new FilmsModel((int)film.id_film, (string)film.id_info, (string)film.film.title, (float)film.evaluate, (string)film.film.poster_path));
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
