import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import {
  EvaluateFrame,
  Card,
  Comment,
  Send,
  Icon,
  Group,
  Frame,
} from "./EvaluateElement";

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [
        {
          avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
          full_name: "Minh Dinh",
          username: "",
          start: 3,
          content:
            "Phim này rất hay ........... ............ ............ .......... .......... ......... ........ ........ ........ .......... ..... đó nha mọi người. Mọi người vào xem đi ạ",
        },
      ],
    };
  }
  render() {
    const comments = this._getComments();

    return (
      <>
        <CommentForm addComment={this._addComment.bind(this)} />
        <EvaluateFrame>
          <Card>
            <h2>Review</h2>
          </Card>
        </EvaluateFrame>
        {comments}
      </>
    );
  }

  _addComment(start, content) {
    const comment = {
      username: "minhdinh365",
      full_name: "minh dinh",
      avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      start,
      content,
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Evaluate
          full_name={comment.full_name}
          avatar={comment.avatar}
          star={comment.start}
          content={comment.content}
        />
      );
    });
  }
}

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = { star: 5 };
  }
  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <EvaluateFrame>
          <Card style={{ display: "block" }}>
            <Group>
              <h2>Post Review</h2>
              <Rating
                name="simple-controlled"
                value={this.state.star}
                onChange={(event, newValue) => {
                  this.setState({ star: newValue });
                }}
              />
            </Group>
            <Comment
              rows="1"
              placeholder="Please Log In To Write Your Comment"
              ref={(textarea) => (this._content = textarea)}
            ></Comment>
            <Send type="submit">Send</Send>
          </Card>
        </EvaluateFrame>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();
    let start = this.state.star;
    let content = this._content;
    this.props.addComment(start, content.value);
  }
}
class Evaluate extends React.Component {
  render() {
    return (
      <>
        <EvaluateFrame>
          <Frame>
            <Icon src={this.props.avatar}></Icon>
            <h3>{this.props.full_name}</h3>
            <Rating name="simple-person" value={this.props.star} readOnly />
            <h4>{this.props.content}</h4>
          </Frame>
        </EvaluateFrame>
      </>
    );
  }
}

export default CommentBox;
