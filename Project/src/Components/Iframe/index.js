import React, { useState, useEffect,  } from "react";
import Iframe from "react-iframe";
import { LocalhostApi } from "../../API/const";
import axios from "axios";

export default function Index({ id, information }) {
  let URL = `https://www.2embed.ru/embed/tmdb/movie?id=${id}`;

  const [state, setState] = useState({ 
    playedTotal: 0,
    loadingTime: 0,
    missTime: 0,
    unLoaded: false,
   });

  
  //  useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // var status = document.querySelector(".jw-icon")?.getAttribute("aria-label");
  //     // var currentTime = parseInt(document.querySelector(".jw-slider-time")?.getAttribute("aria-valuenow"));
  //     // if(status == "Loading")
  //     // {
  //     //   setState({loadingTime: currentTime, unLoaded: true });
  //     // }
  //     // else if(status == "Pause" && state.unLoaded){
  //     //   if(state.loadingTime + 2 < currentTime){
  //     //     setState({unLoaded: false, missTime: state.missTime + (currentTime - state.loadingTime) });
  //     //   }
  //     // }
  //     // else if(status == "Pause"){
  //     //   setState({playedTotal: currentTime - state.missTime });

  //     //   axios.put(LocalhostApi + "watched", {
  //     //     id: id,
  //     //     username: information.username,
  //     //     watched: true,
  //     //     time_span: state.playedTotal
  //     //   });
  //     // }

  //     var temp = document.activeElement.outerHTML;
  //     console.log(temp);
  //   }, 5000)

  //   return function cleanup() {
      
  //     clearInterval(intervalId);
  //   }
  // });

  return (
    <div className="wrapper-iframe">

    <button type="button" onClickCapture={() =>window.mainCaiGiDo()}>Duyt ME</button>
      <Iframe
        url={URL}
        id="iframe-video"
        className="iframe-video"
        display="flex"
        position="relative"
        allow="fullscreen"
      />
    </div>
  );
}
