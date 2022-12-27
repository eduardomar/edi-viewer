import moment from 'moment';
import records from '../records';
import Segment from '../interfaces/Segment';
import ElementJSON from '../interfaces/ElementJSON';
import { COUNTRIES } from '../constants';

const recordsNames = Object.keys(records);

const getValueFormatted = (seg: ElementJSON, value: string): string => {
  if (value?.trim()?.length === 0) return value;

  const valueWithoutSpaces = value.trim();
  if (seg.options?.[valueWithoutSpaces] !== undefined) {
    return `${valueWithoutSpaces} - ${seg.options?.[valueWithoutSpaces]}`;
  } else if (seg.datetimeFormat !== undefined) {
    return moment(valueWithoutSpaces, seg.datetimeFormat[0]).format(
      seg.datetimeFormat[1],
    );
  } else if (
    (seg.name.toLocaleLowerCase().includes('country') ||
      seg.name.toLocaleLowerCase().includes('countries')) &&
    Array.isArray(COUNTRIES[valueWithoutSpaces.toLocaleUpperCase()])
  ) {
    const isoCode = valueWithoutSpaces.toLocaleUpperCase();
    const description = COUNTRIES[isoCode].join(',');

    return `${isoCode} - ${description}`;
  }

  return valueWithoutSpaces;
};

const ediToObject = (edi: string): Segment[] => {
  const max = edi.length % 80 === 0 ? 0 : edi.length + (80 - (edi.length % 80));
  const ediFix = edi.padEnd(max, ' ');

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
