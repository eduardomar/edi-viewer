import React, { useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import useParams from '../../hooks/useParams';
import ediToObject from '../../utils/ediToObject';
import Actions from './Actions';
import { optionsViewer } from './constants';
import JsonView from './JsonView';
import MissingRecords from './MissingRecords';
import RichView from './RichView';
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

      {radioValue === 'rich' && <RichView segments={segments} />}
      {radioValue === 'json' && <JsonView segments={segments} />}

      <MissingRecords segments={segments} />
      <Actions segments={segments} />
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  padding-block: 2rem;
`;

export default StandalonePN;
