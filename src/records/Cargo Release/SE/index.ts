import RecordJSON from '../../../interfaces/RecordJSON';
import SE10 from './SE10.json';
import SE11 from './SE11.json';
import SE13 from './SE13.json';
import SE15 from './SE15.json';
import SE16 from './SE16.json';
import SE17 from './SE17.json';
import SE20 from './SE20.json';
import SE30 from './SE30.json';
import SE35 from './SE35.json';
import SE36 from './SE36.json';
import SE40 from './SE40.json';
import SE41 from './SE41.json';
import SE50 from './SE50.json';
import SE55 from './SE55.json';
import SE56 from './SE56.json';
import SE60 from './SE60.json';
import SE61 from './SE61.json';
import SE90 from './SE90.json';

const SE = [
  SE10,
  SE11,
  SE13,
  SE15,
  SE16,
  SE17,
  SE20,
  SE30,
  SE35,
  SE36,
  SE40,
  SE41,
  SE50,
  SE55,
  SE56,
  SE60,
  SE61,
  SE90,
].map(record => record as RecordJSON);

export default SE;
