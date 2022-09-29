import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import A from './A.json';
import B from './B.json';
import OI from './OI.json';
import PE10 from './PE10.json';
import PE90 from './PE90.json';
import PG01 from './PG01.json';
import CargoRelease from './Cargo Release';
import EntrySummary from './Entry Summary';
import Y from './Y.json';
import Z from './Z.json';
import RecordJSON from '../interfaces/RecordJSON';
import Record from '../interfaces/Record';

const recordsJSON: RecordJSON[] = [
  A,
  B,
  ...CargoRelease,
  ...EntrySummary,
  OI,
  PE10,
  PE90,
  PG01,
  Y,
  Z,
];

const Wrapper = styled.span`
  & > ul {
    margin-block: 1rem;
  }

  & > ul.custom > li::marker {
    content: attr(type) ' ';
    font-weight: bold;
  }

  & > ul.custom > li::before {
    content: '=';
  }
`;
const recordsEntries = recordsJSON
  .filter(({ name, elements }) => {
    return name?.length > 0 && elements?.length > 0;
  })
  .map(({ name, elements }) => {
    return [
      name,
      elements.map(seg => {
        const { description } = seg;
        seg.description = ReactDOMServer.renderToString(
          <Wrapper dangerouslySetInnerHTML={{ __html: description }} />,
        );

        return seg;
      }),
    ];
  });

const records = Object.fromEntries(recordsEntries) as Record;
export default records;
