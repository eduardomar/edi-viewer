import React from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import Segment from '../../interfaces/Segment';
import ItemRecordNotFound from './ItemRecordNotFound';

interface MissingRecordsProps {
  segments: Segment[];
}

const MissingRecords: React.FC<MissingRecordsProps> = ({ segments }) => {
  const segmentsNotFound = segments.filter(
    ({ elements }) => elements.length === 0,
  );

  if (segmentsNotFound.length === 0) return <></>;

  return (
    <WrapperButtons>
      <Card bg="danger">
        <Card.Header>No record found for these segments</Card.Header>
        <ListGroup variant="flush">
          {segmentsNotFound.map(({ edi }, index) => (
            <ItemRecordNotFound key={index} edi={edi} />
          ))}
        </ListGroup>
      </Card>
    </WrapperButtons>
  );
};

const WrapperButtons = styled(Container)`
  margin-top: 1rem;
  padding-inline: 0;

  & > div > div.card-header {
    color: white;
  }

  & > div > div.list-group > button > span {
    color: black;
  }
`;

export default MissingRecords;
