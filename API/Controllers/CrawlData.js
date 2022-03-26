
import { Genre } from "../models/Genre.js";
import axios from "axios";


export const CrawlCast = async (req, res) => {
                try {
                    axios
                        .get(
                        `https://api.themoviedb.org/3/genre/movie/list?api_key=a2df3d1a7611194432bbdf1fc80540f2&language=en-US`
                        )
                        .then((data) => {                         
                            data.data.genres?.forEach((item) => {
                                const caster = new Genre( {
                                    id: item.id,
                                    name: item.name,
                                });
                                caster.save().catch((error) => {console.log(error);});
                            })      
                    });
                }  
                catch (error) {console.log(error);}   
            //   const update2 = { crew: data.data.crew };
            //   if (index.job == "Director") {
            //     Film.findOneAndUpdate(filter, update2, { new: true }).then(
            //       (data) => {
            //         console.log("done");
            //         console.log(element.id);
            //       }
            //     );
            //   }
            };
         
  
