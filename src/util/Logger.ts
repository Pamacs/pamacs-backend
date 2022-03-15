enum LogType {
    INFO = "[ INFO ]", WARNING = "[ WARNING ]", ERROR = "[ ERROR ]"
}

export default class Logger {

    static info(msg: string | string[]) {
        Logger.log(LogType.INFO, msg);
    }

    static warning(msg: string | string[]) {
        Logger.log(LogType.WARNING, msg);
    }

    static error(msg: string | string[]) {
        Logger.log(LogType.ERROR, msg);
    }

    private static log(t: LogType, content: string | string[]) {
        let date = new Date();

        switch (Array.isArray(content)) {

            case true: {
                if (content.length < 2) throw new Error("Content array is too small, it should be 2 or more if you want it to be piped.");

                let lines = [];
                for (let i = 0 ; i < content.length ; i++) {

                    let element = content[i];

                    let isFirstE = i == 0;
                    let isBetweenE = i > 0 && i < content.length - 1;
                    let isLastE = i == content.length - 1;

                    switch (true) {
                        case isFirstE: lines.push(
                            `┌ ${date.getHours()}:${date.getMinutes()} ] ${t} >> ${element}`
                        ); break;

                        case isBetweenE: lines.push(
                            `│ ${date.getHours()}:${date.getMinutes()} ] ${t} >> ${element}`
                        ); break;

                        case isLastE: lines.push(
                            `└ ${date.getHours()}:${date.getMinutes()} ] ${t} >> ${element}`
                        ); break;

                    }
                }
                console.log(lines.join("\n"));
                break;
            }
            case false: {
                console.log(`${date.getHours()}:${date.getMinutes()} ] ${t} >> ${content}`);
                break;
            }

        }
    }

}