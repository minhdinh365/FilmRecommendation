import React, { useState } from "react";
import ModalVideo from "react-modal-video";

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
          <Poster src={props.contents.Image} />
          <Detail>
            <Title>{props.contents.Title}</Title>
            <Controller>
              <Rate>
                <span
                  className="iconify"
                  data-icon="ant-design:star-filled"
                ></span>
                <span>{props.contents.Star}</span>
              </Rate>
              <Like>
                <span
                  className="iconify"
                  data-icon="ant-design:heart-filled"
                ></span>
                <span>{props.contents.Heart}</span>
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
            <Slogan>{props.contents.Slogan}</Slogan>
            <Desc>{props.contents.Description}</Desc>
            <Statistics>
              <ReleaseDate>
                <div>Release Date:</div>
                <div>{props.contents.ReleaseDate}</div>
              </ReleaseDate>
              <RunningTime>
                <div>Running Time:</div>
                <div>{props.contents.Runtime} mins</div>
              </RunningTime>
              <Budget>
                <div>Budget: </div>
                <div>$ {props.contents.Budget}</div>
              </Budget>
              <Revenue>
                <div>Revenue: </div>
                <div>$ {props.contents.Revenue}</div>
              </Revenue>
            </Statistics>
          </Detail>
        </Card>
      </Container>
    </>
  );
};

export default DetailMovieCard;
