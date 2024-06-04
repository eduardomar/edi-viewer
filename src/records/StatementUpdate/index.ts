/* eslint-disable @typescript-eslint/no-var-requires */
import RecordJSON from '../../interfaces/RecordJSON';
const StatementUpdate: RecordJSON[] = [
  require('./H.json'),
  require('./H1.json'),
  require('./H2.json'),
  require('./H3.json'),
];

export default StatementUpdate.flat();
