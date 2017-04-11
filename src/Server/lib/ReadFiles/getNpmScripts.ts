import * as fs from "fs";
import * as path from "path";

export module ReadFiles{
	export function getNpmcripts(filePath){
		let filePathStr=filePath+'package.json';
		return new Promise((resolve,reject)=>{
			fs.readFile(filePathStr,(err, data)=>{
				if (err){reject(err)}
				else{
					try{
						let file=JSON.parse(data.toString());
						if(file.hasOwnProperty("scripts")){
							resolve(file.scripts);
						}
					}
					catch(e){
						reject(e);
					}
				}
			})
		})
	}
}
ReadFiles.getNpmcripts("../../../../")
	.then((v)=>{console.log(v)})
	.catch((e)=>{console.log(e)})