import pkg from 'chalk';
const { blue, green, yellow, red, cyan } = pkg;
import { RenderData } from '../api.js';

export function update() {}
export function render(width, height) {
    return new RenderData([
        `  ${blue('CPU:')} ${colorPercent('21')} ${yellow(`[${blue('|||||----------------')}]`)}`,
        `  ${blue('RAM:')} ${colorPercent('54')} ${yellow(`[${blue('|||||||||||----------')}]`)}`,
        `  ${blue('NET Usage:')} ${colorNet('mid')}`,
        '',
        `     ${blue('Name')}   | ${blue('CPU')} | ${blue('RAM')} | ${blue('NET')} | ${blue('Target')}`,
        processString('nmap', 16, 32, 'mid', '255.255.255.255'),
        processString('pwncat', 20, 18, 'low', '54.72.36.124'),
    ]);
}
export function handle(key) {}

function processString(name, cpu, ram, net, target) {
    let out =
        `  ${(name + '          ').substr(0, 10)}| ` +
        `${colorPercent(cpu)} | ` +
        `${colorPercent(ram)} | ` +
        `${colorNet(net)} | ` +
        `${cyan(target)}`;
    return out;
}

function colorPercent(percent) {
    if (percent <= 40) return green(percent + '%');
    if (percent <= 70) return yellow(percent + '%');
    return red(percent + '%');
}

function colorNet(net) {
    if (net === 'top') return red(net);
    if (net === 'mid') return yellow(net);
    if (net === 'low') return green(net);
    return net;
}

function loadingBar(percent) {
    
}
