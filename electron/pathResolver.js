import path from 'path';
import {
    app
} from 'electron';
import isDev from './utils.js';

export function getPathResolver() {
    return path.join(
        app.getAppPath(),
        isDev() ? './electron/preload.cjs' : './dist-electron/preload.cjs'
    )
}