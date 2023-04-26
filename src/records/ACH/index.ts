/* eslint-disable @typescript-eslint/no-var-requires */
import RecordJSON from '../../interfaces/RecordJSON';
const ACH: RecordJSON[] = [
  require('./PT.json'),
  require('./E0.json'),
  require('./E1.json'),
];

export default ACH.flat();
