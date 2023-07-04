/* eslint-disable @typescript-eslint/no-var-requires */
import RecordJSON from '../../interfaces/RecordJSON';
const MIDQuery: RecordJSON[] = [
  require('./zero.json'),
  require('./first.json'),
  require('./second.json'),
  require('./third.json'),
  require('./fourth.json'),
  require('./fifth.json'),
  require('./seventh.json'),
];

export default MIDQuery.flat();
