import ElementJSON from './ElementJSON';

interface Element extends ElementJSON {
  value: string;
  valueFormatted: string;
}

export default Element;
