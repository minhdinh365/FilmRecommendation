import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import {
  EvaluateFrame,
  Card,
  Comment,
  Send,
  Icon,
  Group,
} from "./EvaluateElement";
const Evaluate = (props) => {
  const [star, setStar] = useState(5);
  return (
    <>
      <EvaluateFrame>
        <Card style={{ display: "block" }}>
          <Group>
            <h2>Post Review</h2>
            <Rating
              name="simple-controlled"
              value={star}
              onChange={(event, newValue) => {
                setStar(newValue);
              }}
            />
          </Group>
          <Comment
            cols="50"
            rows="2"
            placeholder="Please Log In To Write Your Comment"
          ></Comment>
          <Send>Send</Send>
        </Card>
      </EvaluateFrame>
      <EvaluateFrame>
        <Card>
          <h2>Review</h2>
        </Card>
      </EvaluateFrame>
      <EvaluateFrame>
        <Card style={{ paddingLeft: "10%" }}>
          <Icon src="https://lh3.googleusercontent.com/a/default-user=s96-c"></Icon>
          <h3>Minh Dinh</h3>
          <Rating name="simple-person" value={3} readOnly />
          <h4>
            Phim này rất hay ........... ............ ............ ..........
            .......... ......... ........ ........ ........ .......... ..... đó
            nha mọi người. Mọi người vào xem đi ạ
          </h4>
        </Card>
      </EvaluateFrame>
    </>
  );
};

export default Evaluate;
