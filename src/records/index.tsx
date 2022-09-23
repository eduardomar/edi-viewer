import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import SegmentA from './A.json';
import SegmentB from './B.json';
import SegmentOI from './OI.json';
import SegmentPE10 from './PE10.json';
import SegmentPE90 from './PE90.json';
import SegmentPG01 from './PG01.json';
import CargoRelease from './Cargo Release';
import SegmentY from './Y.json';
import SegmentZ from './Z.json';
import RecordJSON from '../interfaces/RecordJSON';
import Record from '../interfaces/Record';

const recordsJSON: RecordJSON[] = [
  SegmentA,
  SegmentB,
  ...CargoRelease,
  SegmentOI,
  SegmentPE10,
  SegmentPE90,
  SegmentPG01,
  SegmentY,
  SegmentZ,
];

const Wrapper = styled.span`
  & > ul.custom > li::marker {
    content: attr(type) ' ';
    font-weight: bold;
  }

  & > ul.custom > li::before {
    content: '=';
  }
`;
const recordsEntries = recordsJSON
  .filter(({ name, segments }) => {
    return name?.length > 0 && segments?.length > 0;
  })
  .map(({ name, segments }) => {
    return [
      name,
      segments.map(seg => {
        const { description } = seg;
        seg.description = ReactDOMServer.renderToString(
          <Wrapper dangerouslySetInnerHTML={{ __html: description }} />,
        );

        return seg;
      }),
    ];
  });

const segments = Object.fromEntries(recordsEntries) as Record;
export default segments;
