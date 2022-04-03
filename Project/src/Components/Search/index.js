import React, { useState, useEffect } from "react";
import axios from "axios";
import { LocalhostApi } from "../../API/const";
import { Container, ListSearch, CardSearch, Img, Title, Wrapper, WrapperIcon, Input } from "./Search";
import { Link, useHistory } from "react-router-dom";

export default function Index() {
  let history = useHistory();
  const [moive, setMovie] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    let isActive = false;
    let Empty = [];
    if (name.length === 0) {
      setMovie(Empty);
    }
    else if (!isActive) {
      if (name.length > 0) {
        axios.get("http://localhost:5000/search/" + name).then((data) => {
          setMovie(data.data.film);
        });
      }
    }
    return () => {
      isActive = true;
    };
  }, [name]);
  const [placeHoder, setplaceHoder] = useState("Nhập tên phim, tác giả,...")
  const filter = (e) => {
    if (e.target.value !== "") {
      setName(e.target.value);
    }
    else setName("");
  };

  const reload = () => {
    window.location.reload();
  }

  const goToPageSearch = (e) => {
    if (e.key === 'Enter') {
      history.push(`/search/${encodeURIComponent(name).replace('%20', '-')}`);
      window.location.reload();
    }
  }
  return (
    <Container>
      <Wrapper>
        <Input
          type="text"
          value={name}
          onChange={filter}
          className="input"
          placeholder={placeHoder}
          onKeyDown={goToPageSearch}
        />
        <WrapperIcon>
          <div>
            <ion-icon name="search" id="1"> </ion-icon>
          </div>
        </WrapperIcon>
      </Wrapper>
      <ListSearch>
        {moive.length > 0 && name.length > 0
          ? moive.slice(0, 10).map((element) => (
            <CardSearch key={element.id} onClick={reload}>
              <Img alt="no img" src={element.poster_path} />
              <Link
                to={{
                  pathname: `/detail/${element.id}`,
                  state: element.id,
                }}
              >
                <Title>{element.title}</Title>
                <Title>{element.release_date}</Title>
              </Link>
            </CardSearch>
          ))
          : null}
        {name.length > 0 ?
          <Link to={{
            pathname: `/search/${encodeURIComponent(name).replace('%20', '-')}`,
            state: name,
          }}>
            <p>Xem tất cả kết quả tìm kiếm "{name}"</p>
          </Link>
          : null}
      </ListSearch>
    </Container>
  );
}
