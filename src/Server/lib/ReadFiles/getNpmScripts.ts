import * as fs from "fs";
import * as path from "path";


export function getNpmScripts (filePath) {
	if (filePath === undefined) return {};
	let filePathStr = path.resolve(filePath ,'package.json');
	return new Promise((resolve, reject) => {
		fs.readFile(filePathStr, (err, data) => {
			if ( err ) {
				if ( err.code === 'ENOENT' ) {

					console.info(`Package.json was not found at ${path.resolve(__dirname, filePath)} continuing...`);
					resolve({});
				}
				else{
				reject(err)}
			}
			else {
				try {
					let file = JSON.parse(data.toString());
					if ( file.hasOwnProperty("scripts") ) {
						resolve(file.scripts);
					}
					else{
						resolve({})
					}
				}
				catch ( e ) {
						reject(e);
				}
			}
		})
	})
}

