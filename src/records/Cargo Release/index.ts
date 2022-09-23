import RecordJSON from '../../interfaces/RecordJSON';
import SE from './SE';
import SF from './SF';
import SO from './SO';

const CargoRelease = ([] as RecordJSON[]).concat(SE).concat(SF).concat(SO);

export default CargoRelease;
