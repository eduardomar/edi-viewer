/* eslint-disable @typescript-eslint/no-var-requires */
import RecordJSON from '../../interfaces/RecordJSON';
const MIDAdd: RecordJSON[] = [
  require('./1.json'),
  require('./2.json'),
  require('./3.json'),
  require('./4.json'),
  require('./5.json'),
  require('./6.json'),
  require('./7.json'),
  require('./A.json'),
];

export default MIDAdd.flat();
