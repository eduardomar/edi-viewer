import segments, { Element } from '../segments';

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
        const index = segmentsNames.findIndex(name => {
          const { start, end } = segments[name][0] ?? { start: 0, end: 0 };

          return edi.substring(start - 1, end) === name;
        });

        if (index !== -1) {
          const segName = segmentsNames[index];

          return {
            edi,
            elements: segments[segName].map(seg => {
              const value = edi.substring(seg.start - 1, seg.end);
              return {
                ...seg,
                value,
                valueFormatted:
                  seg?.options === undefined ||
                  value.trim().length === 0 ||
                  seg.options[value.trim()]?.length === 0
                    ? value.trim()
                    : `${value.trim()} - ${seg.options[value.trim()]}`,
              };
            }),
          };
        }

        console.error('No segment found for this record ::>', edi);
        return {
          edi,
          elements: [],
        };
      })
  );
};

export default ediToObject;
