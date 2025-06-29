import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
  Header,
  Button,
  Label,
} from 'semantic-ui-react';
import he from 'he';

import Countdown from '../Countdown';
import { getLetter } from '../../utils';
import './Quiz.css';

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (questionIndex > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questionIndex]);

  const handleAnswerClick = (option) => {
    setUserSlectedAns(option);
  };

  const handleNext = () => {
    const currentQ = data[questionIndex] || {};
    const correctRaw = currentQ.correct_answer || currentQ.answer || '';
    const selectedRaw = userSlectedAns || '';

    const correct = he.decode(correctRaw).trim().toLowerCase();
    const selected = he.decode(selectedRaw).trim().toLowerCase();

    let point = selected === correct ? 1 : 0;

    const qna = [
      ...questionsAndAnswers,
      {
        question: he.decode(currentQ.question || ''),
        user_answer: selectedRaw,
        correct_answer: correctRaw,
        point,
      },
    ];

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSlectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = (timeTaken) => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };

  const currentQ = data[questionIndex] || {};
  const questionText = he.decode(currentQ.question || '');
  const options = currentQ.options || [];

  return (
    <div className="quiz-wrapper">
      <div className="quiz-card">
        <div className="quiz-header">
          <Header as="h3" style={{ margin: 0 }}>
            Awesome Quiz App
          </Header>
          <Label color="blue">
            Time Left:{' '}
            <Countdown
              countdownTime={countdownTime}
              timeOver={timeOver}
              setTimeTaken={setTimeTaken}
              onlyTime
            />
          </Label>
        </div>

        <div className="quiz-question">
          {questionIndex + 1}. {questionText}
        </div>

        <div className="quiz-options">
          {options.map((option, i) => {
            const decoded = he.decode(option);
            const letter = getLetter(i);
            return (
              <Button
                key={decoded}
                fluid
                size="large"
                onClick={() => handleAnswerClick(decoded)}
                color={userSlectedAns === decoded ? 'blue' : null}
                style={{ justifyContent: 'flex-start' }}
              >
                <b style={{ marginRight: '10px' }}>{letter}</b> {decoded}
              </Button>
            );
          })}
        </div>

        <div className="quiz-button">
          <span>
            Question {questionIndex + 1} of {data.length}
          </span>
          <Button
            primary
            onClick={handleNext}
            disabled={!userSlectedAns}
            icon="arrow right"
            labelPosition="right"
            content="Next Que"
          />
        </div>
      </div>
    </div>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
