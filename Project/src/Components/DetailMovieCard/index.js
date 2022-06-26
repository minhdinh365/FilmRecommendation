import React, { useState, useEffect } from "react";
import ModalVideo from "react-modal-video";
import { URL_BACKGROUND } from "../../API/const";
import { Link, animateScroll as scroll } from "react-scroll";
import Iframe from "../../Components/Iframe";
import Fade from "react-reveal";
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
  WrapperCaster,
  WrapperButton,
  WrapperThum,
} from "./DetailMovieCardElement";
import ModalSign from "../../Pages/Login/ModalLogin";
import { useHistory } from 'react-router';

const DetailMovieCard = (props) => {
  const [isOpen, setOpenModal] = useState(false);
  const [hidden, setHidden] = useState("none");
  function SaveMovie() {
  }
  const history = useHistory();
  function checkUser() {
    if (props.information == undefined) {
      setOpen(false);
      setLoginOpen(true)
    }
    else {
      const dateNow = new Date().toISOString();
      var dateUpgrade = props.information.date_end;
      const diffInMilliseconds = new Date(dateNow).getTime() - new Date(dateUpgrade).getTime()
      if (diffInMilliseconds > 0 || dateUpgrade == undefined) {
        history.push('/upgrade_user')
      }
    }
  }

  useEffect(() => {
    document.title = props.contents.title;
  }, []);

  const [loginOpen, setLoginOpen] = useState(false)
  const [open, setOpen] = useState(true)

  return (
    <>

      <ModalSign
        open={loginOpen} setLoginOpen={setLoginOpen} detail={true}
      ></ModalSign>
      <PlayYoutube style={{ display: hidden }}>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={props.contents.video_id}
          onClose={() => {
            setOpenModal(false);
            setHidden("none");
          }}
          autoPlay={false}
        />
      </PlayYoutube>
      <Background
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${props.contents.backdrop_path}")`,
        }}
      >
        <Container>
          <Card>
            <Poster
              src={`https://image.tmdb.org/t/p/w500/${props.contents.poster_path}`}
            />
            <Detail>
              <Fade bottom duration={3000}>
                <Title>{props.contents.title}</Title>
                <Controller>
                  <WrapperThum>
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
                  </WrapperThum>
                  <WrapperButton>
                    <TrailerButton
                      onClick={() => {
                        setOpenModal(true);
                        setHidden("flex");
                      }}
                    >
                      <span
                        className="iconify"
                        data-icon="clarity:play-solid"
                      ></span>
                      <span>Xem Trailer</span>
                    </TrailerButton>
                    <TrailerButton>
                      <Link
                        activeClass="active"
                        to="iframe-video"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={checkUser}
                      >
                        Xem Phim
                      </Link>
                    </TrailerButton>

                  </WrapperButton>
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
                      return i === props.contents.genre_ids.length - 1 ? (
                        <span key={element.id}> {element.name + " "}</span>
                      ) : (
                        <span key={element.id}> {element.name + ", "}</span>
                      );
                    })}
                  </Gener>
                  <Gener>
                    <div>Đạo diễn:</div>
                    {props.contents.crew.map(function (element, index) {
                      return element.job == "Director" ? (
                        <span key={index}>{element.name}</span>
                      ) : (
                        null
                      );
                    })}
                  </Gener>
                </Statistics>
              </Fade>
            </Detail>
          </Card>
          <Caster>
            <WrapperButton>
              <TrailerButton onClick={() => SaveMovie()}>
                <ion-icon name="stopwatch"></ion-icon>
                <span>Xem Sau</span>
              </TrailerButton>
              <TrailerButton onClick={() => SaveMovie()}>
                <ion-icon name="stopwatch"></ion-icon>
                <span >Yêu thích</span>
              </TrailerButton>
            </WrapperButton>
            <h2>Diễn viên trong phim</h2>
            <WrapperCaster>
              {props.castMovie.slice(0, 6).map((element) => {
                return (
                  <CasterCard key={element.id}>
                    <img
                      src={URL_BACKGROUND + element.profile_path}
                      alt="No img"
                      onError={(e) => {
                        if (e.target.src === URL_BACKGROUND + "null") {
                          e.target.onerror = null;
                          e.target.src =
                            "https://cdn-icons-png.flaticon.com/512/1496/1496058.png";
                        }
                      }}
                    />
                    <h3>{element.original_name}</h3>
                    <h4>{element.character}</h4>
                  </CasterCard>
                );
              })}
            </WrapperCaster>
          </Caster>

          {props.information && props.information?.date_end > new Date().toISOString() ?
            <Fade bottom duration={3000}>
              <Iframe id={props.contents.id} information={props.information}></Iframe>
            </Fade>
            :
            <WrapperCaster style={{ color: 'yellow', background: 'black', width: '90%', fontSize: '20px', padding: '30px' }} >Bạn cần đăng nhập và nâng cấp tài khoản để xem phim</WrapperCaster>
          }
        </Container>
      </Background>
    </>
  );
};

export default DetailMovieCard;
