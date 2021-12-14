import { program } from 'commander';
import { create } from './randomizer.js';
import { validators } from './validation.js';

program
  .version('0.0.1')
  .enablePositionalOptions()
  .command('create')
  .addHelpCommand()
  .option('-d, --driver', 'Add driver to each group')
  .option('-f, --filepath [value]', 'Specify full filepath to class list (in json). Defaults to local class.json with exported default.')
  .option('-o, --output [value]', 'Output filepath')
  .option('-s, --size [value]', 'Number of people in each group')
  .action((options, command) => {
    const { driver, filepath, output, size } = options;
    validators.filepath(filepath);
    validators.number(size);
    create(filepath, size, driver, output);
  });

program.parseAsync(process.argv);
