import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Stats from './Stats';
import QNA from './QNA';

const Result = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
  replayQuiz,
  resetQuiz,
}) => {
  return (
    <Container>
      {/* Stats section at the top */}
      <Stats
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
        timeTaken={timeTaken}
        replayQuiz={replayQuiz}
        resetQuiz={resetQuiz}
      />

      <br />

      {/* QNA section right below */}
      <QNA questionsAndAnswers={questionsAndAnswers} />
    </Container>
  );
};

Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
};

export default Result;
