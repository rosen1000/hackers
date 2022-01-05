import * as readline from 'readline';
import chalk from 'chalk';
import * as tm from './modules/taskmanager.js';
import * as net from './modules/net.js';
import { center, RenderData } from './api.js';
const floor = Math.floor;

const clear = () => process.stdout.write('\u001B[2J\u001B[3J\u001B[0;0H');

// let cli = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

let keys = new Map();
keys.set('up', Buffer.from([0x1b, 0x5b, 0x41]));
keys.set('down', Buffer.from([0x1b, 0x5b, 0x42]));
keys.set('right', Buffer.from([0x1b, 0x5b, 0x43]));
keys.set('left', Buffer.from([0x1b, 0x5b, 0x44]));

let index = 2;

// process.stdin.on('data', render);

function update(data) {
    clear();
    // let text = `I'm the cum goblin, welcome to the ${chalk.red("CUM CAVE")}`;
    let output = '';
    for (let i = 0; i < process.stdout.rows; i++) {
        // process.stdout.write("\n");
        output += '\n';
        for (let i = 0; i < process.stdout.columns; i++) {
            if (i == (process.stdout.columns / 7) * 2) output += '|';
            //process.stdout.write("|");
            else if (i == (process.stdout.columns / 7) * 5) output += '|';
            //process.stdout.write("|");
            else output += ' '; //process.stdout.write(" ");
        }
    }

    process.stdout.write(output);

    // for (var i = 0; i < process.stdout.rows - 1; i++) {
    //     process.stdout.write("||\n")
    // }
    // for (var i = 0; i < process.stdout.columns; i++) {
    //     process.stdout.write("=")
    // }

    // console.log("@");
    // if (index > 0 && data.equals(keys.get("down"))) index--;
    // if (index < 2 && data.equals(keys.get("up"))) index++;

    // if (index == 2) console.log(chalk.black(chalk.bgWhite("Option 1")));
    // else console.log("Option 1");

    // if (index == 1) console.log(chalk.black(chalk.bgWhite("Option 2")));
    // else console.log("Option 2");

    // if (index == 0) console.log(chalk.black(chalk.bgWhite("Option 3")));
    // else console.log("Option 3");
}

/**
 * concept:
 * LocalFS |        | TaskMngr
 * --------+        +----------
 * RemoteFS|  tmux  |   NET
 * --------+        +----------
 *   Note  |        |  Mission
 */

function render() {
    clear();

    const rows = process.stdout.rows;
    const columns = process.stdout.columns;
    const rowsFirst = floor(rows / 3), rowsSecond = floor(rows / 3) * 2;
    const colsFirst = floor(columns / 7) * 2, colsSecond = floor(columns / 7) * 5;
    const regex = /\\x1B\[\d\dm/;
    let output = '';
    let tmContext = tm.render((columns / 7) * 2, rows / 3);
    let netContext = net.render((columns / 7) * 2, rows / 3);

    console.time('render');
    for (let i = 0; i < rows; i++) {
        output += '\n';
        for (let j = 0; j < columns; j++) {
            if (i == rowsFirst || i == rowsSecond) {
                if (j == colsFirst) output += '\u2524';
                else if (j == colsSecond) output += '\u251c';
                else if (j < colsFirst || j > colsSecond) output += '\u2500';
                else output += ' ';
                continue;
            }
            if (j == colsFirst) output += '\u2502';
            else if (j == colsSecond) output += '\u2502';
            else {
                if (j > colsSecond) {
                    if (i < rowsFirst) {
                        output += tmContext.next();
                    } else if (i < rowsSecond) {
                        output += "    " + center(netContext.next(), columns - colsSecond).trimEnd();
                    }
                    j = columns;
                } else {
                    output += ' ';
                }
            }
        }
    }
    console.timeEnd('render');
    
    process.stdout.write(output);
}

// console.log(tm.render(2));

render();
