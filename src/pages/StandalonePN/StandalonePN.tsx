import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import ReactJson from 'react-json-view';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ediToObject from '../../utils/ediToObject';
import AccordionItem from './AccordionItem';
import Actions from './Actions';
import { optionsViewer } from './constants';
import ViewerSelector from './ViewerSelector';

const StandalonePN: React.FC = () => {
  const [radioValue, setRadioValue] = React.useState<string>(
    optionsViewer[0].value,
  );

  const { edi } = useParams();
  const ret = ediToObject(edi ?? '');

  return (
    <Wrapper>
      <ViewerSelector radioValue={radioValue} setRadioValue={setRadioValue} />

      {radioValue === 'rich' && (
        <Accordion alwaysOpen>
          {ret.map((segment, index) => (
            <AccordionItem
              key={index}
              eventKey={`${index}`}
              segment={segment}
            />
          ))}
        </Accordion>
      )}
      {radioValue === 'json' && (
        <ReactJson
          src={ret.map(({ elements }) =>
            Object.fromEntries(
              elements.map(({ name, value }) => [name, value]),
            ),
          )}
        />
      )}
      <Actions edi={ret} />
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  padding-block: 2rem;
`;

export default StandalonePN;
