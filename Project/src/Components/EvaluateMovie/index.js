import React from "react";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";

import {
  EvaluateFrame,
  Card,
  Comment,
  Send,
  Icon,
  Group,
  Frame,
  ReviewFrame,
  ReplyFrame,
  ReplyBox,
} from "./EvaluateElement";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      information: [],
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.comments !== nextState.comments) {
      this.setState({
        comments: nextState.comments,
      });
    }
    if (this.state.information !== nextProps.information) {
      this.setState({ information: nextProps.information });
    }
    if (this.props.evaluate !== nextProps.evaluate) {
      this.setState({ comments: nextProps.evaluate });
    }
  }
  render() {
    const comments = this._getComments();
    return (
      <>
        <CommentForm
          addComment={this._addComment.bind(this)}
          information={this.state.information}
        />
        <EvaluateFrame>
          <Card>
            <h2>Review</h2>
          </Card>
        </EvaluateFrame>
        {comments.filter((item) => item !== undefined)}
      </>
    );
  }

  _addComment(full_name, avatar, start, content, is_reply) {
    const temp_id = this.state.comments;
    const comment = {
      id_film: this.state.comments[0].id_film,
      id_info: this.state.information.username,
      full_name: full_name,
      avatar: avatar,
      evaluate: start,
      contents: content,
      is_reply: is_reply,
    };
    // axios
    //   .post("http://192.168.1.3:3030/comments", {
    //     comment,
    //   })
    //   .then(
    //     (response) => {
    //       console.log("OK");
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    const id = -temp_id.length;
    this.setState({
      comments: this.state.comments.concat({ ...comment, id }),
    });
  }

  _getComments() {
    if (this.state.comments !== undefined) {
      return this.state.comments.map((comment) => {
        if (!comment.is_reply) {
          let temp = { cmt: [] };
          temp = {
            cmt: temp.cmt.concat(
              <Evaluate
                addComment={this._addComment.bind(this)}
                id={comment.id}
                avatar={this.state.information.avatar}
                full_name={this.state.information.full_name}
                star={comment.evaluate}
                content={comment.contents}
              />
            ),
          };
          this.state.comments.map((reply) => {
            if (comment.id === reply.is_reply) {
              temp = {
                cmt: temp.cmt.concat(
                  <Reply
                    avatar={this.state.information.avatar}
                    full_name={this.state.information.full_name}
                    star={reply.evaluate}
                    content={reply.contents}
                  />
                ),
              };
            }
          });
          return temp.cmt;
        }
      });
    }
  }
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { star: 5 };
  }

  render(props) {
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
    this.props.addComment(
      this.props.information.full_name,
      this.props.information.avatar,
      start,
      content.value,
      0
    );
  }
}
class Evaluate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
    };
  }
  render() {
    let commentNodes;
    let buttonText = "Reply";
    if (this.state.showComments) {
      buttonText = "Cancel";
      commentNodes = (
        <>
          <ReplyBox
            rows="1"
            placeholder="Please Log In To Write Your Comment"
            ref={(textarea) => (this._content = textarea)}
          ></ReplyBox>
          <Send type="button" onClick={this._handleSubmit.bind(this)}>
            Send
          </Send>
        </>
      );
    }
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
        {/* <form onSubmit={this._handleSubmit.bind(this)}> */}
        <EvaluateFrame>
          <Frame>
            <label for={this.props.id}>{buttonText}</label>
            <input
              type="radio"
              name="comment-input"
              ref={(input) => (this._id = input)}
              id={this.props.id}
              value={this.props.id}
              onClick={this._handleClick.bind(this)}
              checked={this.state.showComments}
            />
            {commentNodes}
          </Frame>
        </EvaluateFrame>
        {/* </form> */}
      </>
    );
  }
  _handleSubmit(event) {
    let content = this._content;
    let _id = this._id;
    this.props.addComment(
      this.props.full_name,
      this.props.avatar,
      0,
      content.value,
      parseInt(_id.value)
    );
  }

  _handleClick(event) {
    this.setState({ showComments: !this.state.showComments });
  }
}

class Reply extends React.Component {
  render() {
    return (
      <>
        <ReviewFrame>
          <ReplyFrame>
            <Icon src={this.props.avatar}></Icon>
            <h3>{this.props.full_name}</h3>
            <h4>{this.props.content}</h4>
          </ReplyFrame>
        </ReviewFrame>
      </>
    );
  }
}

export default CommentBox;
