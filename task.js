var path = require('path');
var chalk = require('chalk');
var env = require('cross-env');
var packson = require('./package.json');


var log = console.log, tasks = {}, charCt = 0;
// command line arguments
var [ task, ...params ] = process.argv.slice(2);
// default process io settings (for 'run' helper)
var stdio = [ process.stdin, process.stdout, process.stderr ];

/*
    Help task for info purposes.
*/
function help()
{
    log(`\n${chalk.whiteBright('Usage')}:\n`);
    log(`   ${chalk.yellowBright('node task [name]')}`);
    log(`\n${chalk.whiteBright(`Available ${packson.name} tasks`)}:\n`);

    Object.keys(tasks).sort().forEach(n => log(`   ${chalk.greenBright(n.padEnd(charCt))}   ${chalk(tasks[n].desc)}`));

    log
    (
      `\n\nTasks are loaded from files listed in ${chalk.bold('taskFiles')} property of ` +
      `the ${chalk.gray('package.json')} file.\n`
    );
}


/*
    Task completion exit.
*/
function exit(code)
{
    if (!code) log(chalk.yellowBright('Task completed'));
    process.exit(code);
}

/**
    Command-line execution helpers
*/
function run(cmd, args, vars)
{
    var varsArr = Object.keys(vars || {}).reduce((a, k) => [ ...a, `${k}=${vars[k]}`], []);
    var argsArr = typeof args === 'string' ? args.split(/ /) : args;
    var error = error => { console.error(error); exit(1); }

    return env([ ...varsArr, cmd, ...argsArr ], { stdio }).on('error', error);
}
// run module or cli executable
run.npx = (args, vars) => run('npx', args, vars)
// run javascript file
run.node = (args, vars) => run('node', args, vars)

/*
    The below code grabs task filenames defined in the `package.json` 
    `taskFiles` array.  A task file should export an array of objects that each
    define a single task.

    A task object should have the following:
      - name: the name of the task (required)
      - desc: a short description for the task
      - fn: the function that runs the task (required)

    Take care to use good task names to prevent collision.
*/
packson.taskFiles.forEach(name => 
{
    var filename = path.join(__dirname, ...[].concat(name));
    require(filename).forEach(t => charCt = Math.max(charCt, (tasks[t.name] = t).name.length));
});

// execute the requested task
if (!task || !tasks[task])
    help();
else if (typeof tasks[task].fn === 'function')
    tasks[task].fn({ exit, log, params, run });
