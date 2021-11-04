import React, { useState, useLayoutEffect } from "react";
import ModalVideo from "react-modal-video";
import Advertisments from '../Advertisments'
import axios from 'axios'
import { URL_DETAIL, API_KEY, URL_BACKGROUND } from '../../API/const'
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
  Background,
  Gener,
  Caster,
  CasterCard,
  WrapperCaster
} from "./DetailMovieCardElement";

const DetailMovieCard = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [hidden, setHidden] = useState("none");
  return (
    <>
      {/* <Advertisments start ={0} end = {10000}/> */}
      <PlayYoutube style={{ display: hidden }}>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={props.contents.video_id}
          onClose={() => {
            setOpen(false);
            setHidden("none");
          }}
          autoPlay={false}
        />
      </PlayYoutube>
      <Background style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${props.contents.backdrop_path}")` }}>
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
                  <span>Xem Trailer</span>
                </TrailerButton>
              </Controller>
              <Slogan>{props.contents.tagline}</Slogan>
              <Desc>{props.contents.overview}</Desc>
              <Statistics>
                <ReleaseDate>
                  <div>Ngày công chiếu:</div>
                  <div>{props.contents.release_date}</div>
                </ReleaseDate>
                <RunningTime>
                  <div>Thời lượng phim:</div>
                  <div>{props.contents.run_time} phút</div>
                </RunningTime>
                <Budget>
                  <div>Ngân sách: </div>
                  <div>$ {props.contents.budget}</div>
                </Budget>
                <Revenue>
                  <div>Doanh thu: </div>
                  <div>$ {props.contents.revenue}</div>
                </Revenue>
                <Gener>
                  <div>Thể loại:</div>
                  {props.contents.genre_ids.map(function (element, i) {
                    return (i === (props.contents.genre_ids.length - 1) ?
                      <span key={element.id}> {element.name + ' '}</span>
                      :
                      <span key={element.id}> {element.name + ', '}</span>)
                  })}
                </Gener>
              </Statistics>
            </Detail>
          </Card>
          <Caster>
            <h2>Diễn viên trong phim</h2>
            <WrapperCaster>
              {props.castMovie.slice(0, 6).map((element) => {
                return (
                  <CasterCard key={element.id}>
                    <img src={URL_BACKGROUND + element.profile_path} alt="No img" onError={(e) => {
                      if (e.target.src === (URL_BACKGROUND + 'null')) { e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/1496/1496058.png"; }
                    }} />
                    <h3>{element.original_name}</h3>
                    <h4>{element.character}</h4>
                  </CasterCard>
                )
              })}
            </WrapperCaster>
          </Caster>
        </Container>
      </Background>
    </>
  );
};

export default DetailMovieCard;
