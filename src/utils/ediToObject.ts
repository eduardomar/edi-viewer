import segments from '../segments';

export interface Element {
  name: string;
  value: string;
  start: number;
  end: number;
}

export interface Segment {
  edi: string;
  elements: Element[];
}

const segmentsNames = Object.keys(segments);

const ediToObject = (edi: string): Segment[] => {
  const max = edi.length + (80 - (edi.length % 80));
  const ediFix = edi.padEnd(max, ' ');
  if (ediFix.length % 80 !== 0) return [];

  const segmentsArr: string[] = ediFix.match(/.{80}/g) ?? [];
  return (
    segmentsArr
      // .filter(segment => segment.startsWith('A'))
      .map(edi => {
        const segment = segmentsNames.filter(name => {
          const { start, end } = segments[name][0];

          return edi.substring(start - 1, end) === name;
        });

        if (segment.length > 0) {
          return {
            edi,
            elements: segments[segment[0]].map(
              ({ originalName, start, end }) => ({
                name: originalName,
                value: edi.substring(start - 1, end),
                start,
                end,
              }),
            ),
          };
        }

        return {
          edi,
          elements: [],
        };
      })
  );
};

export default ediToObject;
