import { Film } from "../models/Film.js";
import { Recommendation } from "../models/Recommendation.js";
import FuzzySearch from "fuzzy-search";

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// export const searchFilms = async (req, res) => {

//   try {
//     console.log(req.params.name);
//     const query = {$text : {$search : req.params.name}}
//     const cursor = await Film
//       .find(query);
//     console.log(req.params.name);

//     res.status(500).json(cursor);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

export const searchFilms = async (req, res) => {
  try {
    const projection = {
      title: 1,
      poster_path: 1,
      id: 1,
      release_date: 1,
    };

    let ListFilms = {};

    var regex = new RegExp(escapeRegex(req.params.name), "gi");
    ListFilms = await Film.find({ title: { $regex: regex } }, projection).limit(
      20
    );

    // Nếu không tìm thấy title thì tìm theo persons
    if (!ListFilms.length) {
      ListFilms = await Film.find(
        {
          $or: [
            {
              $and: [
                { "crew.name": { $regex: regex } },
                { "crew.job": "Director" },
              ],
            },
            { "cast.name": { $regex: regex } },
          ],
        },
        projection
      ).limit(20);
    }

    var search = req.params.name;
    while (ListFilms.length <= 0) {
      search = search.slice(0, search.length - 1);
      regex = new RegExp(escapeRegex(search), "gi");
      ListFilms = await GetListSearch(regex);
    }

    let index = 0;
    while (ListFilms.length < 20) {
      let listFind = [
        await Recommendation.findOne(
          { id: ListFilms[index].id },
          { "recommendation.id": 1 }
        ),
      ];

      let arr = [];

      for (var item of listFind[0].recommendation) {
        if (ListFilms.length + arr.length > 20) break;
        arr.push(item.id);
      }

      ListFilms.push(
        ...(await Film.find(
          { id: { $in: arr } },
          { title: 1, poster_path: 1, id: 1, release_date: 1 }
        ))
      );

      index = index + 1;
    }

    return res.status(200).json({ film: ListFilms });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const GetListSearch = async (regex) => {
  const projection = {
    title: 1,
    poster_path: 1,
    id: 1,
    release_date: 1,
  };

  let ListFilms = {};

  ListFilms = await Film.find({ title: { $regex: regex } }, projection).limit(
    20
  );

  // Nếu không tìm thấy title thì tìm theo persons
  if (!ListFilms.length) {
    ListFilms = await Film.find(
      {
        $or: [
          {
            $and: [
              { "crew.name": { $regex: regex } },
              { "crew.job": "Director" },
            ],
          },
          { "cast.name": { $regex: regex } },
        ],
      },
      projection
    ).limit(20);
  }

  return ListFilms;
};
