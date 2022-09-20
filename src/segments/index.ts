import SegmentA from './A.json';
import SegmentB from './B.json';
import SegmentOI from './OI.json';
import SegmentPE10 from './PE10.json';
import SegmentSE10 from './SE10.json';
import SegmentPE90 from './PE90.json';
import SegmentPG01 from './PG01.json';
import SegmentY from './Y.json';
import SegmentZ from './Z.json';

const segments = Object.fromEntries(
  [
    SegmentA,
    SegmentB,
    SegmentSE10,
    SegmentPE10,
    SegmentPE90,
    SegmentOI,
    SegmentPG01,
    SegmentY,
    SegmentZ,
  ].map(({ name, segments }) => [name, segments]),
);

export default segments;
