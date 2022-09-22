import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import SegmentA from './A.json';
import SegmentB from './B.json';
import SegmentOI from './OI.json';
import SegmentPE10 from './PE10.json';
import SegmentPE90 from './PE90.json';
import SegmentPG01 from './PG01.json';
import SegmentSE10 from './SE10.json';
import SegmentSE11 from './SE11.json';
import SegmentSE13 from './SE13.json';
import SegmentSE15 from './SE15.json';
import SegmentSE16 from './SE16.json';
import SegmentSE17 from './SE17.json';
import SegmentSE20 from './SE20.json';
import SegmentSE30 from './SE30.json';
import SegmentSE35 from './SE35.json';
import SegmentSE36 from './SE36.json';
import SegmentSE40 from './SE40.json';
import SegmentSE41 from './SE41.json';
import SegmentSE50 from './SE50.json';
import SegmentSE55 from './SE55.json';
import SegmentSE56 from './SE56.json';
import SegmentSE60 from './SE60.json';
import SegmentY from './Y.json';
import SegmentZ from './Z.json';

const segmentsJSON = [
  SegmentA,
  SegmentB,
  SegmentOI,
  SegmentPE10,
  SegmentPE90,
  SegmentPG01,
  SegmentSE10,
  SegmentSE11,
  SegmentSE13,
  SegmentSE15,
  SegmentSE16,
  SegmentSE17,
  SegmentSE20,
  SegmentSE30,
  SegmentSE35,
  SegmentSE36,
  SegmentSE40,
  SegmentSE41,
  SegmentSE50,
  SegmentSE55,
  SegmentSE56,
  SegmentSE60,
  SegmentY,
  SegmentZ,
];

export interface Segment {
  [key: string]: Element[];
}
export interface Option {
  [key: string]: string;
}

export interface Element {
  name: string;
  originalName: string;
  sec: number;
  status: string;
  start: number;
  end: number;
  filler: string;
  align: string | null;
  max: number;
  class?: string;
  description: string;
  options?: Option;
  value?: string;
  valueFormatted?: string;
}

interface SegmentJSON {
  name: string;
  segments: Element[];
}

const Wrapper = styled.span`
  & > ul.custom > li::marker {
    content: attr(type) ' ';
    font-weight: bold;
  }

  & > ul.custom > li::before {
    content: '=';
  }
`;
const segmentsEntries = segmentsJSON
  .filter(seg => {
    const { name, segments } = seg as SegmentJSON;

    return name?.length > 0 && segments?.length > 0;
  })
  .map(seg => {
    const { name, segments } = seg as SegmentJSON;

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

const segments = Object.fromEntries(segmentsEntries) as Segment;

export default segments;
