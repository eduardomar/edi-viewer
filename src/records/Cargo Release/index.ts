/* eslint-disable @typescript-eslint/no-var-requires */
import RecordJSON from '../../interfaces/RecordJSON';
const CargoRelease: RecordJSON[] = [
  require('./SE').default,
  require('./SF').default,
  require('./SO').default,
];

export default CargoRelease.flat();
