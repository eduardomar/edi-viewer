import records from '../records';
import Segment from '../interfaces/Segment';

const recordsNames = Object.keys(records);

const ediToObject = (edi: string): Segment[] => {
  const max = edi.length + (80 - (edi.length % 80));
  const ediFix = edi.padEnd(max, ' ');
  if (ediFix.length % 80 !== 0) return [];

  const segmentsArr: string[] = ediFix.match(/.{80}/g) ?? [];
  return segmentsArr.map(edi => {
    const index = recordsNames.findIndex(name => {
      const { start, end } = records[name][0] ?? { start: 0, end: 0 };

      return edi.substring(start - 1, end) === name;
    });

    if (index !== -1) {
      const segName = recordsNames[index];

      return {
        edi,
        elements: records[segName].map(seg => {
          const value = edi.substring(seg.start - 1, seg.end);
          const valueFormatted = value.trim();

          return {
            ...seg,
            value,
            valueFormatted:
              seg?.options === undefined ||
              valueFormatted.length === 0 ||
              seg.options[valueFormatted]?.length === 0
                ? valueFormatted
                : `${valueFormatted} - ${seg.options[valueFormatted]}`,
          };
        }),
      };
    }

    console.error('No record found for this record ::>', edi);
    return {
      edi,
      elements: [],
    };
  });
};

export default ediToObject;
