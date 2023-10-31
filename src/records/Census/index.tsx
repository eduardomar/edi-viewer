/* eslint-disable @typescript-eslint/no-var-requires */
import RecordJSON from '../../interfaces/RecordJSON';
const CensusWarning: RecordJSON[] = [
  require('./CW01.json'),
  require('./CW02.json'),
  require('./CW03.json'),
];

export default CensusWarning.flat();
