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
        const segment = segmentsNames.filter(name => {
          const { start, end } = segments[name][0];

          return edi.substring(start - 1, end) === name;
        });

        if (segment.length > 0) {
          return {
            edi,
            elements: segments[segment[0]].map(seg => {
              const value = edi.substring(seg.start - 1, seg.end);
              return {
                ...seg,
                value,
                valueFormatted:
                  seg?.options === undefined
                    ? value.trim()
                    : `${value.trim()} - ${seg.options[value?.trim()]}`,
              };
            }),
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
