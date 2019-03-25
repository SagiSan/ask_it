import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Input, Button } from "reactstrap";
import { getQuestions, createQuestion } from "../../reducers/homeReducer";
import { getUser } from "../../reducers/loginReducer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getQuestions();
    if (!this.props.user.id) {
      this.props.getUser(localStorage.getItem('user_id'))
    }
  }
  addQuestion = () => {
    this.props.createQuestion(this.state.question, this.props.user.id);
    this.setState({ question: '' });
  }
  render() {
    const { question } = this.state;
    return (
      <div className="Home">
        <ListGroup>
          {this.props.questions.length > 0 &&
            this.props.questions.map(question => {
              return (
                <Link key={question.id} to={`/question/${question.id}`}>
                  <ListGroupItem
                    style={{ wordWrap: "break-word" }}
                    className="mb-2 col-10 col-md-8 col-lg-4 offset-1 offset-md-2 offset-lg-4"
                  >
                    {question.text}
                  </ListGroupItem>
                </Link>
              );
            })}
        </ListGroup>
        <Input className="mb-2 col-10 col-md-8 col-lg-4 offset-1 offset-md-2 offset-lg-4"
          type='textarea' placeholder='Enter your question' value={question} onChange={e => this.setState({ question: e.target.value })} />
        <Button className="mb-2 col-10 col-md-8 col-lg-4 offset-1 offset-md-2 offset-lg-4"
          color='success' onClick={this.addQuestion}>Add Question</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.login.user,
    requestSent: state.home.requestSent,
    sendingRequest: state.home.sendingRequest,
    requestFailed: state.home.requestFailed,
    questions: state.home.questions
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUser,
      getQuestions,
      createQuestion
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
