import Element from '../interfaces/Element';

interface Segment {
  name: string;
  elements: Element[];
}

const writeSegmentEdi = (segment: Segment, data: any): string => {
  const record = segment.elements
    .sort(({ sec: a }, { sec: b }) => a - b)
    .map(ele => {
      if (ele.name === 'controlId') return segment.name;

      let val: string = data?.[ele.name] ?? '';

      if (ele.class === 'S') {
        return ''.padStart(ele.max, ' ');
      }
      if (ele.class === 'N') {
        val = val.replace(/[^\d.]/gi, '');

        if (val.length > 0) {
          if (ele.decimal !== undefined) {
            val = `${parseFloat(val).toFixed(2)}`.replace('.', '');
          } else {
            val = `${Math.round(parseFloat(val))}`;
          }
        }
      }

      if (val.length > ele.max) return val.substring(0, ele.max);

      if (ele.align === 'Left') return val.padEnd(ele.max, ele.filler);

      if (ele.align === 'Right')
        return val.padStart(ele.max, val.length > 0 ? ele.filler : ' ');

      return null;
    })
    .filter((ele: string | null) => ele !== null && ele.length > 0)
    .join('')
    .replace(/\/+$/, '');

  // if (record.replace(segment.name, '').trim().length > 0) return record;

  return record;
};

export default writeSegmentEdi;
