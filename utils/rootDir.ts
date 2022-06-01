import { dirname } from 'path';

if (!require.main) throw new Error('Missing main property on Node require object');

export default dirname(require.main.filename);
