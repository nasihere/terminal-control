import * as fs from 'fs';
import * as path from 'path';

export  module ReadFiles {
	interface IDirFilesObj {
		[ext: string]: {
			[filename: string]: {
				path: string,
				content: Buffer
			}
		}
	}
	export function getDirFiles (extensions: Array<string>, dirPath: string): Promise<IDirFilesObj> {
		return new Promise((resolve, reject): void => {
			fs.readdir(
				dirPath,
				(err, files) => {
					if ( err ) {
						reject(err);
						return;
					}
					let obj = {};
					files.map((file) => {
						return path.join(path.resolve(__dirname,dirPath), file);
					}).filter(
						(file, idx) => {
							return extensions.indexOf(path.extname(file)) !== -1
						})
						.map((file) => {console.log(file)
							let ext = path.extname(file);
							let fileName = path.basename(file);

							if ( !obj.hasOwnProperty(ext) ) {
								obj[ ext ] = {}
							}
							obj[ ext ][ fileName ] = {};
							obj[ ext ][ fileName ].path = dirPath;
							obj[ ext ][ fileName ].content = fs.readFileSync(file)

							//  console.log("%s (%s)", file, path.extname(file));
						});
					resolve(obj)
				})
		})
	}
}

