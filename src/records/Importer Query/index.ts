/* eslint-disable @typescript-eslint/no-var-requires */
import RecordJSON from '../../interfaces/RecordJSON';
const ImporterQuery: RecordJSON[] = [require('./KI').default];

export default ImporterQuery.flat();
