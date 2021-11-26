import React from "react";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import socketClient from "socket.io-client";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AlertDialog from "./announcement";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { LocalhostApi } from "../../API/const";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total_comment: this.props.total_comment,
      comments: this.props.evaluate,
      information: this.props.information,
      id: this.props.id,
      limmitComment: 6,
      loadMore: true,
      socket: null,
      announcement: false,
      waiting: [],
    };
  }
  socket;
  configSocket = async () => {
    var socket = socketClient(LocalhostApi);
    this.socket = socket;

    socket.on("get-new-cmt", async (cmt) => {
      let data = await cmt;
      if (parseInt(this.state.id) === cmt.id_film) {
        this.setState({
          comments: this.state.comments.concat({ ...data }),
          total_comment: this.state.total_comment + 1,
        });
      }
    });

    socket.on("get-update-cmt", async (cmt) => {
      if (parseInt(this.state.id) === parseInt(cmt.id_film)) {
        let comment = await cmt.comment;
        this.setState({
          comments: comment,
        });
      }
    });
  };

  async componentDidMount() {
    await this.configSocket();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.total_comment !== nextState.total_comment) {
      this.setState({
        total_comment: nextState.total_comment,
      });
    }
    if (this.state.announcement !== nextState.announcement) {
      this.setState({
        announcement: nextState.announcement,
      });
    }
    if (this.state.waiting !== nextState.waiting) {
      this.setState({
        waiting: nextState.waiting,
      });
    }
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
    const totalComment = comments.slice(0, this.state.limmitComment);
    const handleClickCommentIn = () => {
      if (this.state.limmitComment + 3 >= comments.length) {
        this.setState({ loadMore: false });
        this.setState({
          limmitComment:
            this.state.limmitComment +
            (3 - (this.state.limmitComment - comments.length + 3)),
        });
      } else {
        this.setState({ loadMore: true });
        this.setState({ limmitComment: this.state.limmitComment + 3 });
      }
    };
    return (
      <>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {this.state.announcement && (
          <AlertDialog
            content={this.state.waiting}
            handleCloseAlert={this._handleClose.bind(this)}
            updateComment={this._updateComment.bind(this)}
          />
        )}
        <CommentDetail>
          <CommentForm
            addComment={this._addComment.bind(this)}
            information={this.state.information}
          />
          <EvaluateFrame>
            <Card>
              <h4>Bình luận ({this.state.total_comment})</h4>
            </Card>
          </EvaluateFrame>
          {totalComment.filter((item) => item !== undefined)}
          {totalComment.length >= 3 ? (
            <p onClick={handleClickCommentIn}>
              <ArrowDropDownIcon className="iconload-more" fontSize="large" />
              Xem thêm...
            </p>
          ) : null}
        </CommentDetail>
      </>
    );
  }
  Subtracttime(int) {
    if (int >= 86400) {
      return parseInt(int / 86400) + " ngày trước";
    } else {
      if (int >= 3600) {
        return parseInt(int / 3600) + " giờ trước";
      } else {
        if (int >= 60) {
          return parseInt(int / 60) + " phút trước";
        } else {
          return parseInt(int) + 1 + " giây trước";
        }
      }
    }
  }
  _updateComment() {
    var commentPut = this.state.waiting;
    var socket = socketClient(LocalhostApi);
    this.socket = socket;
    axios
      .put(LocalhostApi + "comment", { commentPut })
      .then((res) => {
        toast.success("Cập nhật thành công!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        alert(err);
      });

    var contents = commentPut.contents;
    var evaluate = commentPut.evaluate;

    var cmt = this.state.comments.map((item, index) =>
      item.id_info === commentPut.id_info &&
        item.is_reply === commentPut.is_reply
        ? { ...item, contents, evaluate }
        : item
    );
    var id_film = this.state.id;
    this.socket.emit("update-cmt", { cmt, id_film });
  }

  _handleClose() {
    this.setState({
      announcement: false,
    });
  }

  _addComment(full_name, avatar, start, content, is_reply) {
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
      .post(LocalhostApi + "comment", {
        comment,
      })
      .then(
        (response) => {
          var socket = socketClient(LocalhostApi);
          this.socket = socket;
          if (response.data.status === "thành công") {
            this.socket.emit("add-new-cmt", response.data.result);
          } else {
            var commentPut = response.data.result;
            this.setState({
              announcement: true,
              waiting: commentPut,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  _getComments() {
    if (this.state.comments !== undefined) {
      this.state.comments.sort(function (a, b) {
        var c = new Date(a.date).getTime();
        var d = new Date(b.date).getTime();
        return d - c;
      });
      return this.state.comments.map((comment) => {
        if (!comment.is_reply) {
          let temp = { cmt: [] };
          var now = new Date(Date.now()).getTime();
          var day2 = new Date(comment.date).getTime();
          var diff = (parseInt(now) - parseInt(day2)) / 1000;
          let r = (Math.random() + 1).toString(36).substring(7);
          temp = {
            cmt: temp.cmt.concat(
              <Evaluate
                addComment={this._addComment.bind(this)}
                id={comment.id}
                key={comment.id + r}
                avatar={comment.info.avatar}
                full_name={comment.info.full_name}
                star={comment.evaluate}
                content={comment.contents}
                time={this.Subtracttime(diff)}
                username={this.state.information}
              />
            ),
          };
          this.state.comments.map((reply) => {
            if (comment.id === reply.is_reply) {
              var current = new Date(Date.now()).getTime();
              var dayPost = new Date(reply.date).getTime();
              var different = (parseInt(current) - parseInt(dayPost)) / 1000;
              let r = (Math.random() + 1).toString(36).substring(7);
              temp = {
                cmt: temp.cmt.concat(
                  <Reply
                    time={this.Subtracttime(different)}
                    key={reply + r}
                    id={comment.id}
                    avatar={reply.info.avatar}
                    full_name={reply.info.full_name}
                    star={reply.evaluate}
                    content={reply.contents}
                    username={this.state.information}
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
    this.state = {
      star: 5,
      information: this.props.information,
    };
  }
  render() {
    let isLogin = false;
    let announce = "Bạn cần đăng nhập để viết bình luận";
    if (this.state.information !== null) {
      isLogin = true;
      announce = "Bình luận...";
    }
    function setLoginOpen() {
      this.setState({ loginOpen: true });
    }
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <EvaluateFrame>
          <Card style={{ display: "block" }}>
            <h2>
              <strong></strong>
            </h2>
            {isLogin ? (
              <>
                <Group>
                  <Rating
                    fontSize="large"
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
                    placeholder={announce}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    ref={(textarea) => (this._content = textarea)}
                  ></Comment>
                  <Send type="submit">
                    <span
                      className="iconify"
                      data-icon="akar-icons:send"
                    ></span>
                  </Send>
                </Group>
              </>
            ) : (
              <span> Bạn cần đăng nhập để bình luận</span>
            )}
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
      this.state.information.full_name,
      this.state.information.avatar,
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
      username: this.props.username,
    };
  }
  render() {
    let commentNodes;
    let buttonText = "Trả lời";
    let isLoginRep = false;
    let announce = "Vui lòng đăng nhập để bình luận";
    if (this.state.username !== null) {
      isLoginRep = true;
      announce = "Bình luận...";
    }
    if (this.state.showComments) {
      buttonText = "Hủy";
      commentNodes = (
        <>
          {isLoginRep ? (
            <GroupPost id={"gr" + this.props.id}>
              <ReplyBox
                rows="1"
                disabled={!isLoginRep}
                placeholder={announce}
                ref={(textarea) => (this._content = textarea)}
              ></ReplyBox>
              <ButtonReply
                disabled={!isLoginRep}
                type="button"
                onClick={this._handleSubmit.bind(this)}
              >
                <span className="iconify" data-icon="akar-icons:send"></span>
              </ButtonReply>
            </GroupPost>
          ) : (
            <span>Bạn chưa đăng nhập</span>
          )}
        </>
      );
    }
    return (
      <>
        <EvaluateFrame>
          <Frame>
            <Icon src={this.props.avatar}></Icon>
            <h3>{this.props.full_name}</h3>
            <h5>
              {this.props.time !== "NaN giây trước"
                ? this.props.time
                : "1 giây trước"}
            </h5>
            <Rating name="simple-person" value={this.props.star} readOnly />
            <h4>{this.props.content}</h4>
          </Frame>
        </EvaluateFrame>
        <EvaluateFrame>
          <Frame style={{ borderBottom: "2px solid gray" }}>
            <label htmlFor={this.props.id}>{buttonText}</label>
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
      this.state.username.full_name,
      this.state.username.avatar,
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
            <div className="line-comment"></div>
            <Icon src={this.props.avatar}></Icon>
            <h3>{this.props.full_name}</h3>
            <h5>
              {this.props.time !== "NaN giây trước"
                ? this.props.time
                : "1 giây trước"}
            </h5>
            <h4>{this.props.content}</h4>
          </ReplyFrame>
        </ReviewFrame>
      </>
    );
  }
}

export default CommentBox;
