import * as fs from "fs";
import * as path from "path";


export function getReadme (filePath) {
    if (filePath === undefined) return {};
    let filePathStr = path.resolve(filePath ,'README.md');
    return new Promise((resolve, reject) => {
        fs.readFile(filePathStr, 'utf8', (err, data) => {
            if ( err ) {
                    resolve('No Package')
            }
            else {
                resolve(data);
            }
        })
    })
}

