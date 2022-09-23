import RecordJSON from '../../../interfaces/RecordJSON';
import SF10 from './SF10.json';
import SF20 from './SF20.json';
import SF25 from './SF25.json';
import SF30 from './SF30.json';
import SF31 from './SF31.json';
import SF35 from './SF35.json';
import SF36 from './SF36.json';

const SF = [SF10, SF20, SF25, SF30, SF31, SF35, SF36].map(
  record => record as RecordJSON,
);

export default SF;
