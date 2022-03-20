import React, { useState, useEffect } from "react";
import axios from "axios";
import { LocalhostApi, LocalhostClient } from "../../API/const";
import Fade from "react-reveal";

export default function Index({ account }) {
  const [type, setType] = useState(true);
  const [comment, setComment] = useState(1);
  const [watchedFilm, setWatchedFilm] = useState(false);
  useEffect(() => {
    let isAcctive = false;
    if (!isAcctive) {
      axios.get(LocalhostApi + "watched?id=" + account).then((res) => {
        setWatchedFilm(res.data.films);
      });
    }
    return () => {
      isAcctive = true;
      setComment([]);
    };
  }, [account, type]);
  useEffect(() => {
    let isAcctive = false;
    if (!isAcctive) {
      axios.get(LocalhostApi + "evaluate?username=" + account).then((res) => {
        setComment(res.data.List);
      });
    }
    return () => {
      (isAcctive = true), setWatchedFilm([]);
    };
  }, [account, type]);
  function swtichType(e) {
    setType(e)
  }
  return (
    <div className="acctivity">
      <div className="category-acctivity">
        <span
          id="1"
          onClick={(e) => swtichType(e.target.id)}
          className={(type == 1) ? "hightlight-span" : null}
        >
          <ion-icon name="film"></ion-icon>
          Đã xem gần đây
        </span>
        <span
          id="2"
          onClick={(e) => swtichType(e.target.id)}
          className={(type == 2) ? "hightlight-span" : null}
        >
         <ion-icon name="chatbubbles"></ion-icon>
          Đã bình luận
        </span>
        <span
          id="3"
          onClick={(e) => swtichType(e.target.id)}
          className={(type == 3) ? "hightlight-span" : null}
        >
          <ion-icon name="time"></ion-icon>
          Danh sách xem sau
        </span>
        <span
          id="4"
          onClick={(e) => swtichType(e.target.id)}
          className={(type == 4) ? "hightlight-span" : null}
        >
          <ion-icon name="thumbs-up"></ion-icon>
          Phim đã yêu thích
        </span>
      </div>
      <div className="detail-acctivity">
        {type ? (
          <>
            {watchedFilm !== false ? (
              <>
                <div className="card-detail-acctivity">
                  <span>Phim</span>
                  <span>Tựa đề</span>
                  <span>Đánh giá</span>
                  <span>Thể loại phim</span>
                </div>
                {watchedFilm.map((element) => {
                  return (
                    <Fade key={element.infoFilm.id}>
                      <a href={"#/detail/" + element.infoFilm.id}>
                        <div className="card-detail-acctivity">
                          <img src={element.infoFilm.poster_path} />
                          <span>{element.infoFilm.title}</span>
                          <span>
                            {element.infoFilm.vote_average}{" "}
                            <ion-icon name="star"></ion-icon>
                          </span>
                          <div className="type-m">
                            {element.infoFilm.genre_ids.map((el) => {
                              return <span key={el.id}>{el.name + ", "}</span>;
                            })}
                          </div>
                        </div>
                      </a>
                    </Fade>
                  );
                })}
              </>
            ) : (
              <h1>Bạn chưa xem phim nào cả</h1>
            )}
          </>
        ) : (
          <>
            {comment !== false ? (
              <>
                <div className="card-detail-acctivity2">
                  <span>Phim</span>
                  <span>Tựa đề</span>s
                  <span>Ngày bình luận</span>
                  <span>Sao đánh giá</span>
                  <span>Nội dung bình luận</span>
                </div>
                {comment.slice(0, 100).map((element) => {
                  return (
                    <Fade key={element.film._id}>
                      <a href={"#/detail/" + element.film.id}>
                        <div className="card-detail-acctivity2">
                          {console.log(element.evaluate)}
                          <img src={element.film.poster_path} />
                          <span>{element.film.title}</span>
                          <span>
                            {Date(element.date.date)
                              .toString()
                              .split(" GMT+0700 (Indochina Time)")}
                          </span>
                          <span>
                            {element.evaluate}
                            <ion-icon name="star"></ion-icon>
                          </span>
                          <span>{element.contents}</span>
                        </div>
                      </a>
                    </Fade>
                  );
                })}{" "}
              </>
            ) : (
              <h1>Bạn chưa bình luận phim nào cả</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}
