import { dirname } from 'path';

export default dirname(require.main?.filename as string);
