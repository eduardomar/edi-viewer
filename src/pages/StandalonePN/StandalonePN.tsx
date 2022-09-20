import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ediToObject from '../../utils/ediToObject';
import AccordionItem from './AccordionItem';

const StandalonePN: React.FC = () => {
  const { edi } = useParams();
  const ret = ediToObject(edi ?? '');

  return (
    <Wrapper>
      <Accordion alwaysOpen>
        {ret.map((segment, index) => (
          <AccordionItem key={index} eventKey={`${index}`} segment={segment} />
        ))}
      </Accordion>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  padding-block: 2rem;
`;

export default StandalonePN;
