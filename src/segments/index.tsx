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
const segmentsEntries = segmentsJSON.map(seg => {
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
