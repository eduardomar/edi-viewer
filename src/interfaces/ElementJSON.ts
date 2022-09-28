interface Option {
  [key: string]: string;
}

interface ElementJSON {
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
  datetimeFormat?: [string, string];
}

export default ElementJSON;
