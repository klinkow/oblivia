import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChoice, startGame } from '../actions/index';
import FormInput from './form-input';

class Footer extends Component {
  componentDidMount() {
    document.getElementById("start").focus();
  }

  resetCSS() {
    var elements = Array.from(document.getElementsByClassName("fade-out"));
    elements.map((element) => element.classList.remove("fade-out"));
    var elements = Array.from(document.getElementsByClassName("scores"));
    elements.map((element) => element.classList.add("pulse"));
  }

  applyCSS(choice) {
    var chosen = document.getElementById(choice)
    if (chosen) {
      var correctAnswer = "";
      if (this.props.gameState === 4) {
        correctAnswer = this.props.round1[0][0]
      } else if (this.props.gameState === 5) {
        correctAnswer = this.props.round1[1][0]
      } else if (this.props.gameState === 6) {
        correctAnswer = this.props.round2[0][0]
      } else if (this.props.gameState === 7) {
        correctAnswer = this.props.round2[1][0]
      } else if (this.props.gameState === 8) {
        correctAnswer = this.props.round3[0][0]
      } else if (this.props.gameState === 9) {
        correctAnswer = this.props.round3[1][0]
      } else if (this.props.gameState === 10) {
        correctAnswer = this.props.round4[0][0]
      } else if (this.props.gameState === 11) {
        correctAnswer = this.props.round4[1][0]
      }
      if (choice === correctAnswer) {
        chosen.classList.add("green")
      } else {
        chosen.classList.add("red")
      }
    }
    var elements = Array.from(document.getElementsByClassName("fade_out"));
    elements.map((element) => element.classList.add("fade-out"));
    var elements = Array.from(document.getElementsByClassName("scores"));
    elements.map((element) => element.classList.remove("pulse"));
  }

  renderChoices(choices) {
    return choices.map((choice) => {
      return (
        <p
        key={choice}
        id={choice}
        className="slanty"
        onClick={() => {
          this.applyCSS(choice);
          setTimeout(() => {
            this.resetCSS();
            this.props.selectChoice(choice)
          }, 1300)}}>
          <span className="fade-in two"><span className="fade_out">{choice}</span></span>
        </p>
      )
    });
  }

  fadeAndStartGame() {
    this.applyCSS();
    setTimeout(() => {
      this.props.startGame();
    }, 700);
  }

  render() {
    if (this.props.gameState === 1) {
      return (
        <div
        id="start"
        className="center slanty fade-in three"
        onClick={() => this.fadeAndStartGame()}>
          <h3 className="fade_out">New Game</h3>
        </div>
      )
    } else if (this.props.gameState === 2) {
      return (
        <div className="center">
          <FormInput
          currentPlayer={this.props.currentPlayer} />
        </div>
      )
    } else if (this.props.gameState === 3) {
      return (
        <div className="center fade_out">
          <FormInput
          currentPlayer={this.props.currentPlayer} />
        </div>
      )
    } else if (this.props.gameState === 4 || this.props.gameState === 5) {
      var questionIndex = (this.props.round1[2] - 4);
      return (
        <div className="footer" key={this.props.round1[questionIndex][1]}>
          {this.renderChoices(this.props.round1[questionIndex][2])}
        </div>
      );
    } else if (this.props.gameState === 6 || this.props.gameState === 7) {
      var questionIndex = (this.props.round2[2] - 6);
      return (
        <div className="footer" key={this.props.round2[questionIndex][1]}>
          {this.renderChoices(this.props.round2[questionIndex][2])}
        </div>
      );
    } else if (this.props.gameState === 8 || this.props.gameState === 9) {
      var questionIndex = (this.props.round3[2] - 8);
      return (
        <div className="footer" key={this.props.round3[questionIndex][1]}>
          {this.renderChoices(this.props.round3[questionIndex][2])}
        </div>
      );
    } else if (this.props.gameState === 10 || this.props.gameState === 11) {
      var questionIndex = (this.props.round4[2] - 10);
      return (
        <div className="footer" key={this.props.round4[questionIndex][1]}>
          {this.renderChoices(this.props.round4[questionIndex][2])}
        </div>
      );
    } else if (this.props.gameState === 12) {
      return (
        <div className="footer"> </div>
      )
    }
    return (
      <div className="footer">
        default
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    gameState: state.gameState,
    currentPlayer: state.currentPlayer,
    round1: state.round1,
    round2: state.round2,
    round3: state.round3,
    round4: state.round4
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectChoice, startGame }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
