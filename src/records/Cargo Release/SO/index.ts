import RecordJSON from '../../../interfaces/RecordJSON';
import SO10 from './SO10.json';
import SO20 from './SO20.json';
import SO30 from './SO30.json';
import SO40 from './SO40.json';
import SO42 from './SO42.json';
import SO50 from './SO50.json';
import SO60 from './SO60.json';
import SO70 from './SO70.json';
import SO71 from './SO71.json';
import SO72 from './SO72.json';

const SO = [SO10, SO20, SO30, SO40, SO42, SO50, SO60, SO70, SO71, SO72].map(
  record => record as RecordJSON,
);

export default SO;
