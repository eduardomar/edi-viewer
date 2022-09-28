import React, { useMemo } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import ReactJson from 'react-json-view';
import styled from 'styled-components';
import useParams from '../../hooks/useParams';
import ediToObject from '../../utils/ediToObject';
import AccordionItem from './AccordionItem';
import Actions from './Actions';
import { optionsViewer } from './constants';
import MissingRecords from './MissingRecords';
import ViewerSelector from './ViewerSelector';

const StandalonePN: React.FC = () => {
  const [radioValue, setRadioValue] = React.useState<string>(
    optionsViewer[0].value,
  );
  const { edi } = useParams();
  const segments = useMemo(() => {
    const arr = ediToObject(edi ?? '');
    const SegmentA = arr.find(({ elements }) =>
      elements.some(({ name, value }) => name === 'controlId' && value === 'A'),
    );
    const elementApp = (SegmentA?.elements ?? []).find(
      ({ name }) => name === 'applicationIdentifierCode',
    );

    if (elementApp?.valueFormatted?.length !== undefined) {
      document.title = elementApp.valueFormatted;
    }

    return arr;
  }, [edi]);

  return (
    <Wrapper>
      <ViewerSelector radioValue={radioValue} setRadioValue={setRadioValue} />

      {radioValue === 'rich' && (
        <Accordion alwaysOpen>
          {segments.map((segment, index) => (
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
          src={segments
            .filter(({ elements }) => elements.length > 0)
            .map(({ elements }) =>
              Object.fromEntries(
                elements.map(({ name, value }) => [name, value]),
              ),
            )}
        />
      )}

      <MissingRecords segments={segments} />
      <Actions segments={segments} />
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  padding-block: 2rem;
`;

export default StandalonePN;
