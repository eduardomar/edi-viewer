import React from 'react';
import { Card } from 'react-bootstrap';
import ReactJson from 'react-json-view';
import Segment from '../../interfaces/Segment';

interface JsonViewProps {
  segments: Segment[];
}

const JsonView: React.FC<JsonViewProps> = ({ segments }) => {
  return (
    <Card>
      <Card.Body>
        <ReactJson
          src={segments
            .filter(({ elements }) => elements.length > 0)
            .map(({ elements }) =>
              Object.fromEntries(
                elements.map(({ name, value }) => [name, value]),
              ),
            )}
        />
      </Card.Body>
    </Card>
  );
};

export default JsonView;
