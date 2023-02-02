import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import RecordJSON from '../interfaces/RecordJSON';
import Record from '../interfaces/Record';
import CargoRelease from './Cargo Release';
import EntrySummary from './Entry Summary';
import ImporterQuery from './Importer Query';

const recordsJSON: RecordJSON[] = [
  require('./A.json'),
  require('./B.json'),
  require('./BLOCK.json'),
  require('./OI.json'),
  require('./PE10.json'),
  require('./PE90.json'),
  require('./PG01.json'),
  require('./TRNACT.json'),
  require('./X0.json'),
  require('./X1.json'),
  CargoRelease,
  EntrySummary,
  ImporterQuery,
  require('./Y.json'),
  require('./Z.json'),
];

const Wrapper = styled.span`
  & > ul {
    margin-block: 1rem;
  }

  & > ul.custom > li[disabled] {
    color: #a6a6a6;
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
  .flat()
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
