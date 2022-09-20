import React, { useState } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import EDI from '../../components/EDI';
import { Segment } from '../../utils/ediToObject';

interface AccordionItemProps {
  eventKey: string;
  segment: Segment;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ eventKey, segment }) => {
  const [highlight, setHighlight] = useState({ start: -1, end: -1 });

  const handleMouseLeave = (): void => setHighlight({ start: -1, end: -1 });

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        <EDI segment={segment.edi} highlight={highlight} />
      </Accordion.Header>
      <Accordion.Body>
        <Table striped bordered hover>
          <tbody>
            {segment.elements.map(({ name, value, start, end }, index) => (
              <tr
                key={index}
                onMouseOver={() => setHighlight({ start, end })}
                onMouseLeave={handleMouseLeave}
              >
                <td>{name}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AccordionItem;
