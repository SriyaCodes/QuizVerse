import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Segment, Header } from 'semantic-ui-react';
import './QNA.css';

const QNA = ({ questionsAndAnswers }) => {
  return (
    <Segment raised className="qna-segment">
      <Header as="h2" textAlign="center" className="qna-title">
        Detailed Answers
      </Header>
      <Table celled striped selectable size="large" className="qna-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No.</Table.HeaderCell>
            <Table.HeaderCell>Question</Table.HeaderCell>
            <Table.HeaderCell>Your Answer</Table.HeaderCell>
            <Table.HeaderCell>Correct Answer</Table.HeaderCell>
            <Table.HeaderCell>Point</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {questionsAndAnswers.map((item, i) => (
            <Table.Row key={i}>
              <Table.Cell>{i + 1}</Table.Cell>
              <Table.Cell>{item.question}</Table.Cell>
              <Table.Cell>
                {item.user_answer || (
                  <span className="no-answer">Not Answered</span>
                )}
              </Table.Cell>
              <Table.Cell>{item.correct_answer}</Table.Cell>
              <Table.Cell>
                {item.point ? (
                  <Icon name="check circle" color="green" />
                ) : (
                  <Icon name="times circle" color="red" />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

QNA.propTypes = {
  questionsAndAnswers: PropTypes.array.isRequired,
};

export default QNA;
