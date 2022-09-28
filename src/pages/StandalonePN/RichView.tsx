import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Segment from '../../interfaces/Segment';
import AccordionItem from './AccordionItem';

interface RichViewProps {
  segments: Segment[];
}

const RichView: React.FC<RichViewProps> = ({ segments }) => {
  return (
    <Accordion alwaysOpen>
      {segments.map((segment, index) => (
        <AccordionItem key={index} eventKey={`${index}`} segment={segment} />
      ))}
    </Accordion>
  );
};

export default RichView;
