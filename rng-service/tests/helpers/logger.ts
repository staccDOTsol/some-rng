const fs = require('fs');

export function printAndLog(logName: string, msg: string) {
  console.log(msg);
  fs.writeFileSync(logName, `${msg}\n`, { flag: "as"} );
}

export function mkdir(dirPath: string) {
  fs.mkdir(dirPath, { recursive: true }, (err: any) => {
    if (err) throw err;
  });
}
