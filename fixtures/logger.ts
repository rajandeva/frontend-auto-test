export interface PLoggerOptions {
    logLevel?: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
}

export class PlaywrightLogger {
    private logLevel = 'INFO';

    constructor(options: PLoggerOptions = { logLevel: 'INFO' }) {
        this.logLevel = options.logLevel || 'INFO';
    }

    async log(message: string): Promise<void> {
        this.printLog(message, 'DEBUG');
    }

    async info(message: string): Promise<void> {

        this.printLog(message, 'INFO');
    }

    async warn(message: string): Promise<void> {
        this.printLog(message, 'WARN');
    }

    async error(message: string): Promise<void> {
        this.printLog(message, 'ERROR');
    }

    private printLog(message: string, level: string): void {
        const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
        if (levels.indexOf(level) >= levels.indexOf(this.logLevel)) {
            console.log(`[${level}]: ${message}`);
        }
    }   
}
