import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getQuestion, getAnswer, createAnswer } from "../../reducers/questionReducer";
import { ListGroup, ListGroupItem, Badge, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpRegular,
  faThumbsDown as faThumbsDownRegular
} from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_answer_index: 0
    };
  }
  componentDidMount() {
    this.props
      .getQuestion(this.props.match.params.id)

  }

  addAnswer = () => {
    console.log(this.state.answer);
  }
  render() {
    const { answer } = this.state;
    if (this.props.pendingRequest) {
      return <div>Loading...</div>;
    }
    return (
      <div className="Question">
        <div className="col-10 col-md-8 col-lg-4 offset-1 offset-md-2 offset-lg-4">
          <h3 className="text-center">{this.props.question.text}</h3>
          <ListGroup>
            {this.props.question.answers &&
              this.props.question.answers.map(answer => {
                return (
                  <ListGroupItem key={answer.id}>
                    <p>{answer.text}</p>
                    <Badge pill style={{ backgroundColor: "#3BB44B" }}>
                      {answer.likedBy && answer.likedBy.length}
                    </Badge>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => console.log("liked")}
                    >
                      <FontAwesomeIcon
                        className="mx-2"
                        icon={faThumbsUpRegular}
                        color=""
                      />
                      <span>Like</span>
                    </span>
                    <Badge
                      pill
                      className="ml-4"
                      style={{ backgroundColor: "#F0292C" }}
                    >
                      {answer.dislikedBy && answer.dislikedBy.length}
                    </Badge>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => console.log("disliked")}
                    >
                      <FontAwesomeIcon
                        className="mx-2"
                        icon={faThumbsDownRegular}
                        color=""
                      />
                      <span>Dislike</span>
                    </span>
                  </ListGroupItem>
                );
              })}
            <Input type='textarea' placeholder="Write your answer" value={answer} onChange={e => this.setState({ answer: e.target.value })} />
            <Button color='success' onClick={this.addAnswer}>Add</Button>
          </ListGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pendingRequest: state.question.pendingRequest,
    requestSent: state.question.requestSent,
    requestFailed: state.question.requestFailed,
    question: state.question.selectedQuestion
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getQuestion,
      getAnswer,
      createAnswer
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
