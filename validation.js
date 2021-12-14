import fs from 'fs';

const logError = (val) => {
  console.log('\x1b[31m%s\x1b[0m', val);
  process.exit(1);
}

export const validators = {
  filepath: (path) => {
    if (path && !fs.existsSync(path)) {
      logError(`File does not exist at ${path}`);
    }
  },
  number: (val) => {
    if (val?.length && isNaN(parseInt(val, 10))) {
      logError(`Inva;id number provided: ${val}`);
    }
  },

}