import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Header,
  Dropdown,
  Button,
  Message,
  Divider,
} from 'semantic-ui-react';
import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  COUNTDOWN_TIME,
} from '../../constants';
import { shuffle } from '../../utils';
import mockData from '../Quiz/mock.json';
import './Main.css';

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('easy');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  const allFieldsSelected =
    numOfQuestions &&
    difficulty &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds);

  const fetchData = () => {
    setProcessing(true);
    setError(null);

    setTimeout(() => {
      const filtered =
        category === '0'
          ? shuffle([...mockData])
          : shuffle(
              mockData.filter(
                (q) => q.category === category && q.difficulty === difficulty
              )
            );

      const limited = filtered.slice(0, numOfQuestions);
      limited.forEach((q) => (q.options = shuffle(q.options)));

      if (limited.length === 0) {
        setProcessing(false);
        setError({
          message: (
            <p>
              No questions available for your selection.
              <br />
              Try changing the category or number of questions.
            </p>
          ),
        });
        return;
      }

      setProcessing(false);
      startQuiz(
        limited,
        countdownTime.hours + countdownTime.minutes + countdownTime.seconds
      );
    }, 1000);
  };

  return (
    <div className="main-bg">
      <div className="main-box zoom-in">
        <Header
          as="h1"
          textAlign="center"
          style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem' }}
        >
          🎯 Ready to Test Your Brain?
          <Header.Subheader
            style={{ fontSize: '1.1rem', marginTop: '0.5rem', color: '#666' }}
          >
            Pick your mode, set the timer & conquer the quiz!
          </Header.Subheader>
        </Header>

        {error && (
          <Message error onDismiss={() => setError(null)}>
            <Message.Header>Error</Message.Header>
            {error.message}
          </Message>
        )}

        <div className="field-row">
          <label>Category</label>
          <Dropdown
            fluid
            selection
            options={CATEGORIES}
            value={category}
            onChange={(e, { value }) => setCategory(value)}
            disabled={processing}
            placeholder="Select Category"
          />
        </div>

        <div className="field-row">
          <label>Number of Questions</label>
          <Dropdown
            fluid
            selection
            options={NUM_OF_QUESTIONS}
            value={numOfQuestions}
            onChange={(e, { value }) => setNumOfQuestions(value)}
            disabled={processing}
            placeholder="Select Number of Questions"
          />
        </div>

        <div className="field-row">
          <label>Difficulty</label>
          <Dropdown
            fluid
            selection
            options={DIFFICULTY}
            value={difficulty}
            onChange={(e, { value }) => setDifficulty(value)}
            disabled={processing}
            placeholder="Select Difficulty"
          />
        </div>

        <div className="field-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <label style={{ marginBottom: '0.5rem' }}>Countdown Timer</label>
          <div className="timer-row">
            <Dropdown
              fluid
              search
              selection
              name="hours"
              placeholder="Hours"
              options={COUNTDOWN_TIME.hours}
              value={countdownTime.hours}
              onChange={handleTimeChange}
              disabled={processing}
            />
            <Dropdown
              fluid
              search
              selection
              name="minutes"
              placeholder="Minutes"
              options={COUNTDOWN_TIME.minutes}
              value={countdownTime.minutes}
              onChange={handleTimeChange}
              disabled={processing}
            />
            <Dropdown
              fluid
              search
              selection
              name="seconds"
              placeholder="Seconds"
              options={COUNTDOWN_TIME.seconds}
              value={countdownTime.seconds}
              onChange={handleTimeChange}
              disabled={processing}
            />
          </div>
        </div>

        <Divider />

        <Button
          fluid
          size="large"
          content={processing ? 'Loading...' : 'Start Quiz 🚀'}
          icon="play"
          labelPosition="left"
          onClick={fetchData}
          disabled={!allFieldsSelected || processing}
          className="start-btn"
        />
      </div>

      {/* 👇 Footer here */}
      <footer className="footer-text">
        <p> Crafted with curiosity — Sriya</p>
      </footer>
    </div>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
