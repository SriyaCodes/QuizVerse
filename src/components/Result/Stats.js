import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Button, Icon, Grid, Divider } from 'semantic-ui-react';
import ShareButton from '../ShareButton';
import { calculateScore, calculateGrade, timeConverter } from '../../utils';
import './Stats.css';

const Stats = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  replayQuiz,
  resetQuiz,
}) => {
  const score = calculateScore(totalQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);

  return (
    <div className="stats-wrapper">
    <Segment raised padded className="stats-card">
      <Header as="h1" textAlign="center" className="stats-title">
        <Icon name="trophy" color="yellow" /> {remarks}
      </Header>

      <Grid columns={3} stackable textAlign="center">
        <Grid.Row>
          <Grid.Column>
            <Header as="h3" className="stats-label">Grade</Header>
            <p className="stats-value">{grade}</p>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3" className="stats-label">Correct</Header>
            <p className="stats-value">{correctAnswers} / {totalQuestions}</p>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3" className="stats-label">Time Taken</Header>
            <p className="stats-value">
              {`${Number(hours)}h ${Number(minutes)}m ${Number(seconds)}s`}
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />

      <div className="stats-buttons">
        <Button primary onClick={replayQuiz} icon labelPosition="left" size="large">
          <Icon name="redo" />
          Play Again
        </Button>
        <Button color="teal" onClick={resetQuiz} icon labelPosition="left" size="large">
          <Icon name="home" />
          Back to Home
        </Button>
      </div>
    </Segment>
    </div>
  );
};

Stats.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
};

export default Stats;
