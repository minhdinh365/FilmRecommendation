import React, { useState, useEffect } from "react";
import axios from "axios";
import { LocalhostApi } from "../../API/const";
import { Container, ListSearch, CardSearch, Img, Title, Wrapper, WrapperIcon, Input } from "./Search";
import { Link } from "react-router-dom";

export default function Index() {
  const [moive, setMovie] = useState([]);
  useEffect(() => {
    let isActive = false;
    if (!isActive) {
      axios.get(LocalhostApi + "search").then((data) => {
        setMovie(data.data.results);
      });
      
    }
    return () => {
      (isActive = true), setMovie();
    };
  }, []);
  const [name, setName] = useState("");
  const [searchMovieFound, setsearchMovieFound] = useState();
  const [typeSearch, settypeSearch] = useState(1);
  const [placeHoder, setplaceHoder] = useState("Tìm kiếm theo phim")
  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = moive.filter((element) => {
        return element.title.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setsearchMovieFound(results);
    } else {
      setsearchMovieFound();
    }
    setName(keyword);
  };
  const reload = () => {
    window.location.reload();
 
  };
  function setSearch (e){
    settypeSearch(e)
    switch (parseInt(e)) {
      case 1:        
        setplaceHoder("Tìm kiếm theo phim");
        break;
      case 2:
        setplaceHoder("Tìm kiếm theo đạo diễn");
        break;
      case 3:
        setplaceHoder("Tìm kiếm theo diễn viên");
        break;     
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
          placeholder= {placeHoder}
        />   
        <WrapperIcon>
          <div className={(typeSearch == 1) ? "tooltip active" : "tooltip"}>
            <ion-icon name="film" id= "1" onClick= {(e) => setSearch(e.target.id)}> </ion-icon>
            <span className="tooltiptext">Tìm theo phim</span>
          </div>
          <div className={(typeSearch == 2) ? "tooltip active" : "tooltip"}>
            <ion-icon name="person" id = "2"  onClick= {(e) => setSearch(e.target.id)}  ></ion-icon>
            <span className="tooltiptext">Tìm theo đạo diễn</span>
          </div>
          <div  className={(typeSearch == 3) ? "tooltip active" : "tooltip"}>
            <ion-icon name="star-outline" id = "3"  onClick= {(e) => setSearch(e.target.id)} ></ion-icon>
            <span className="tooltiptext">Tìm theo diễn viên</span>
          </div>                        
        </WrapperIcon>   
        
        </Wrapper>
      <ListSearch>
        {searchMovieFound && searchMovieFound.length > 0
          ? searchMovieFound.slice(0, 20).map((element) => (
              <CardSearch key={element.id} onClick={reload}>
                <Img alt="no img" src={element.poster_path} />
                <Link
                  to={{
                    pathname: `/detail/${element.id}`,
                    state: element.id,
                  }}
                >
                  <Title>{element.title}</Title>
                  <Title>20-12-2020</Title>
                </Link>
              </CardSearch>
            ))
          :null}
      </ListSearch>
    </Container>
  );
}
