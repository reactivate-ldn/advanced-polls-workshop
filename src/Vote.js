import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { connect as connectSocket, addVote, getPoll } from './actions/poll';

import Container from './components/Container';
import Title from './components/Title';
import Chart from './components/chart';
import Voting from './components/Voting';

class App extends Component {
  onClick = answerId => {
    this.props.addVote(answerId);
  };

  componentDidMount() {
    this.props.connect();
    this.props.getPoll('1234');
  }

  render() {
    const { poll } = this.props;

    if (!poll) {
      return (
        <Container>
          <Title>
            Loading...
          </Title>
        </Container>
      );
    }

    return (
      <Container>
        <Title>
          {poll.title}
        </Title>

        <Chart answers={poll.answer}/>

        <Voting
          answers={poll.answer}
          onClick={this.onClick}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  poll: state.poll
})

const mapDispatchToProps = dispatch => bindActionCreators({
  connect: connectSocket,
  addVote: answerId => addVote(answerId),
  getPoll
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
