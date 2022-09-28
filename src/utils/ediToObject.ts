import moment from 'moment';
import records from '../records';
import Segment from '../interfaces/Segment';
import ElementJSON from '../interfaces/ElementJSON';

const recordsNames = Object.keys(records);

const getValueFormatted = (seg: ElementJSON, value: string): string => {
  if (value?.trim()?.length === 0) return value;

  if (seg.options?.[value] !== undefined) {
    return `${value} - ${seg.options?.[value]}`;
  } else if (seg.datetimeFormat !== undefined) {
    return moment(value, seg.datetimeFormat[0]).format(seg.datetimeFormat[1]);
  }

  return value;
};

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
            valueFormatted: getValueFormatted(seg, valueFormatted),
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
