import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import moment from "moment";

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
} from "./DetailMovieCardElement";

const DetailMovieCard = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [hidden, setHidden] = useState("none");

  var str = props.contents.release_date;
  var date = moment(str);
  var release_date = date.utc().format("YYYY-MM-DD");

  return (
    <>
      <PlayYoutube style={{ display: hidden }}>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={"L61p2uyiMSo"}
          onClose={() => {
            setOpen(false);
            setHidden("none");
          }}
        />
      </PlayYoutube>
      <Container>
        <Card>
          <Poster src={props.contents.poster_url} />
          <Detail>
            <Title>{props.contents.title}</Title>
            <Controller>
              <Rate>
                <span
                  className="iconify"
                  data-icon="ant-design:star-filled"
                ></span>
                <span>{props.contents.evaluate}</span>
              </Rate>
              <Like>
                <span className="iconify" data-icon="mdi:eye"></span>
                <span>{props.contents.view}</span>
              </Like>
              <TrailerButton
                onClick={() => {
                  setOpen(true);
                  setHidden("flex");
                }}
              >
                <span class="iconify" data-icon="clarity:play-solid"></span>
                <span>Play Trailer</span>
              </TrailerButton>
            </Controller>
            <Slogan>{props.contents.slogan}</Slogan>
            <Desc>{props.contents.overview}</Desc>
            <Statistics>
              <ReleaseDate>
                <div>Release Date:</div>
                <div>{release_date}</div>
              </ReleaseDate>
              <RunningTime>
                <div>Running Time:</div>
                <div>{props.contents.running_time} mins</div>
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
    </>
  );
};

export default DetailMovieCard;
