import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import moment from "moment";
import axios from "axios";
import { VIDEO_LINK,API_KEY } from "../../API/const";

import {
  PlayYoutube,
  Container,
  Card,
  Poster,
  Detail,
  Title,
  Controller,
  Rate,
  Like,
  TrailerButton,
  Slogan,
  Desc,
  Statistics,
  ReleaseDate,
  RunningTime,
  Budget,
  Revenue,
  Background
} from "./DetailMovieCardElement";

const DetailMovieCard = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [hidden, setHidden] = useState("none");

  var str = props.contents.release_date;
  var date = moment(str);
  var release_date = date.utc().format("YYYY-MM-DD");
  const  [idVideo, setidVideo] = useState();
  const url = `${VIDEO_LINK}${props.contents.id}/videos${API_KEY}`;
    axios.get(url).then(response => {
      setidVideo(response.data.results[0].key);
    });
  return (
    <>
      <PlayYoutube style={{ display: hidden }}>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={idVideo}
          onClose={() => {
            setOpen(false);
            setHidden("none");
          }}
          autoPlay = {false}
        />
      </PlayYoutube>
      <Background style={{ backgroundImage: `url("https://image.tmdb.org/t/p/w500/${props.contents.backdrop_path}")`}}>
      <Container >
        <Card>
          <Poster src={`https://image.tmdb.org/t/p/w500/${props.contents.poster_path}`} />
          <Detail>
            <Title>{props.contents.title}</Title>
            <Controller>
              <Rate>
                <span
                  className="iconify"
                  data-icon="ant-design:star-filled"
                ></span>
                <span>{props.contents.vote_average}</span>
              </Rate>
              <Like>
                <span className="iconify" data-icon="mdi:eye"></span>
                <span>{props.contents.vote_count}</span>
              </Like>
              <TrailerButton
                onClick={() => {
                  setOpen(true);
                  setHidden("flex");
                }}
              >
                <span className="iconify" data-icon="clarity:play-solid"></span>
                <span>Play Trailer</span>
              </TrailerButton>
            </Controller>
            <Slogan>{props.contents.tagline}</Slogan>
            <Desc>{props.contents.overview}</Desc>
            <Statistics>
              <ReleaseDate>
                <div>Release Date:</div>
                <div>{release_date}</div>
              </ReleaseDate>
              <RunningTime>
                <div>Running Time:</div>
                <div>{props.contents.runtime} mins</div>
              </RunningTime>
              <Budget>
                <div>Budget: </div>
                <div>$ {props.contents.budget}</div>
              </Budget>
              <Revenue>
                <div>Revenue: </div>
                <div>$ {props.contents.revenue}</div>
              </Revenue>
            </Statistics>
          </Detail>
        </Card>
      </Container>
      </Background>
    </>
  );
};

export default DetailMovieCard;
