import SegmentA from './A.json';
import SegmentB from './B.json';
import SegmentOI from './OI.json';
import SegmentPE10 from './PE10.json';
import SegmentSE10 from './SE10.json';
import SegmentSE11 from './SE11.json';
import SegmentPE90 from './PE90.json';
import SegmentPG01 from './PG01.json';
import SegmentY from './Y.json';
import SegmentZ from './Z.json';

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

const segments = Object.fromEntries(
  [
    SegmentA,
    SegmentB,
    SegmentSE10,
    SegmentSE11,
    SegmentPE10,
    SegmentPE90,
    SegmentOI,
    SegmentPG01,
    SegmentY,
    SegmentZ,
  ].map(({ name, segments }: SegmentJSON) => [name, segments]),
);

export default segments;
