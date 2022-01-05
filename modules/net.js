import { RenderData } from '../api.js';
import pkg from 'chalk';

export function update() {}

export function render(width, height) {
    return new RenderData([
        '',
        '',
        pkg.blue('Your public IP'),
        pkg.yellow('88.43.51.118'),
        '',
        pkg.blue('Active connection'),
        pkg.yellow('76.43.26.116'),
    ]);
}

export function handle(key) {}
