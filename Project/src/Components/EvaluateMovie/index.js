import React from "react";
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
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      information: [],
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.comments !== nextState.comments &&
      this.props.evaluate === this.state.information
    ) {
      this.setState({
        comments: this.state.comments.concat([nextState.comments]),
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
        {comments}
      </>
    );
  }

  _addComment(full_name, avatar, start, content) {
    const comment = {
      full_name: full_name,
      avatar: avatar,
      evaluate: start,
      contents: content,
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _getComments() {
    if (this.state.comments !== undefined) {
      return this.state.comments.map((comment) => {
        return (
          <Evaluate
            avatar={this.state.information.avatar}
            full_name={this.state.information.full_name}
            star={comment.evaluate}
            content={comment.contents}
          />
        );
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
      content.value
    );
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
