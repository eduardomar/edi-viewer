/* eslint-disable @typescript-eslint/no-var-requires */
import RecordJSON from '../../interfaces/RecordJSON';
const EntrySummary: RecordJSON[] = [
  require('./Q1.json'),
  require('./Q2.json'),
  require('./Q3.json'),
  require('./Q4.json'),
  require('./Q5.json'),
  require('./Q6.json'),
  require('./Q7.json'),
  require('./QA.json'),
  require('./QE.json'),
  require('./QJ.json'),
];

export default EntrySummary.flat();
