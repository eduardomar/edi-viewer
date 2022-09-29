/* eslint-disable @typescript-eslint/no-var-requires */
import RecordJSON from '../../interfaces/RecordJSON';
const EntrySummary: RecordJSON[] = [
  require('./AE').default,
  require('./AX').default,
];

export default EntrySummary.flat();
