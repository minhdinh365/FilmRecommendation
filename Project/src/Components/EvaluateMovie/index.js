import React from "react";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";

import {
  CommentDetail,
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
  ButtonReply,
  GroupPost,
} from "./EvaluateElement";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      information: [],
      id: "",
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
    if (this.state.id !== nextProps.id) {
      this.setState({ id: nextProps.id });
    }
  }
  render() {
    const comments = this._getComments();
    return (
      <CommentDetail>
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
      </CommentDetail>
    );
  }

  _addComment(full_name, avatar, start, content, is_reply) {
    const temp_id = this.state.comments;
    const comment = {
      id_film: this.state.id,
      id_info: this.state.information.username,
      full_name: full_name,
      avatar: avatar,
      evaluate: start,
      contents: content,
      is_reply: is_reply,
    };
    axios
      .post("http://localhost:5000/comment", {
        comment,
      })
      .then(
        (response) => {
          console.log("OK");
        },
        (error) => {
          console.log(error);
        }
      );
    const id = -temp_id.length === 0 ? 1 : -temp_id.length;
    this.setState({
      comments: this.state.comments.concat({ ...comment, id }),
    });
  }

  _getComments() {
    if (this.state.comments !== undefined) {
      return this.state.comments.map((comment) => {
        if (!comment.is_reply) {
          let temp = { cmt: [] };
          var now = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime();
          var day2 = new Date(comment.date).getTime();
          var diff = day2 - now;
          function time(int) {
            int = int / 1000
            if (int >= 86400) {
              return (parseInt(int / 86400) + ' ngày trước');
            }
            else {
              if (int >= 3600) {
                return (parseInt(int / 3600) + ' giờ trước');
              }
              else {
                if (int >= 60) {
                  return (parseInt(int / 60) + ' phút trước');
                }
                else {
                  return (parseInt(int) + ' giây trước');
                }
              }

            }
          }
          temp = {
            cmt: temp.cmt.concat(
              <Evaluate
                addComment={this._addComment.bind(this)}
                id={comment.id}
                avatar={this.state.information.avatar}
                full_name={this.state.information.full_name}
                star={comment.evaluate}
                content={comment.contents}
                time={comment.date}
                username={this.state.information.username}
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
                    username={this.state.information.username}
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

  render() {
    let isLogin = true;
    let announce = "Please Log In To Write Your Comment";
    if (this.props.information.username != "") {
      isLogin = false;
      announce = "Enter write Your Comment";
    }
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <EvaluateFrame>
          <Card style={{ display: "block" }}>
            <Group>
              <h2>Post Review</h2>
              <Rating
                fontsize="large"
                name="simple-controlled"
                value={this.state.star}
                onChange={(event, newValue) => {
                  this.setState({ star: newValue });
                }}
              />
            </Group>
            <Group>
              <Comment
                rows="1"
                disabled={isLogin}
                placeholder={announce}
                ref={(textarea) => (this._content = textarea)}
              ></Comment>
              <Send type="submit">
                <span class="iconify" data-icon="akar-icons:send"></span>
              </Send>
            </Group>
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
      id_check: "",
      on_blur: false,
    };
  }
  render() {
    let commentNodes;
    let buttonText = "Reply";
    let isLogin = true;
    let announce = "Please Log In To Write Your Comment";
    if (this.props.username != "") {
      isLogin = false;
      announce = "Enter write Your Comment";
    }
    if (this.state.showComments) {
      buttonText = "Cancel";
      commentNodes = (
        <>
          <GroupPost id={"gr" + this.props.id}>
            <ReplyBox
              rows="1"
              disabled={isLogin}
              placeholder={announce}
              ref={(textarea) => (this._content = textarea)}
            ></ReplyBox>
            <ButtonReply type="button" onClick={this._handleSubmit.bind(this)}>
              <span class="iconify" data-icon="akar-icons:send"></span>
            </ButtonReply>
          </GroupPost>
        </>
      );
    }
    return (
      <>
        <EvaluateFrame>
          <Frame>
            <Icon src={this.props.avatar}></Icon>
            <h3>{this.props.full_name}</h3>
            <h5>{this.props.time}</h5>
            <Rating name="simple-person" value={this.props.star} readOnly />
            <h4>{this.props.content}</h4>
          </Frame>
        </EvaluateFrame>
        <EvaluateFrame>
          <Frame style={{ borderBottom: '2px solid gray' }}>
            <label for={this.props.id}>{buttonText}</label>
            <input
              type="radio"
              name="comment-input"
              ref={(input) => (this._id = input)}
              id={this.props.id}
              value={this.props.id}
              onClick={this._handleClick.bind(this)}
            />
            {commentNodes}
          </Frame>
        </EvaluateFrame>
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
