import React, { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import useParams from '../../hooks/useParams';
import Segment from '../../interfaces/Segment';
import ediToObject from '../../utils/ediToObject';
import { optionsViewer } from './constants';
import JsonView from './JsonView';
import MissingRecords from './MissingRecords';
import Navbar from './Navbar';
import Offcanvas, { OffcanvasProps } from './Offcanvas';
import RichView from './RichView';

const ViewerEDI: React.FC = () => {
  const [dataOffcanvas, setDataOffcanvas] = useState<OffcanvasProps | null>(
    null,
  );
  const [radioValue, setRadioValue] = useState<string>(optionsViewer[0].value);
  const [title, setTitle] = useState('');

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
      setTitle(elementApp.valueFormatted);
    }

    return arr;
  }, [edi]);

  const [validSegments, invalidSegments] = useMemo(() => {
    return segments.reduce(
      (acc, segment) => {
        if (segment.elements.length > 0) acc[0].push(segment);
        else acc[1].push(segment);

        return acc;
      },
      [[] as Segment[], [] as Segment[]],
    );
  }, [segments]);

  return (
    <Wrapper>
      <Navbar
        title={title}
        segments={segments}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
      />

      {dataOffcanvas !== null && <Offcanvas {...dataOffcanvas} />}

      {radioValue === 'rich' && (
        <RichView
          segments={validSegments}
          dataOffcanvas={dataOffcanvas}
          setDataOffcanvas={setDataOffcanvas}
        />
      )}
      {radioValue === 'json' && <JsonView segments={validSegments} />}

      <MissingRecords segments={invalidSegments} />
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  padding-top: 4rem;
  padding-bottom: 2rem;
`;

export default ViewerEDI;
