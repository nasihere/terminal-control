import * as fs from 'fs';

export class configHandler{
	configSrc:string;
	constructor(configSrc){
		this.configSrc=configSrc;
	}
	saveConfig = function (newConfig, connection) {
		let obj = {
			configService: []
		};

		fs.readFile(this.configSrc, 'utf8', (err, data) => {
			if ( err ) {
				console.log(err);
			} else {
				obj = JSON.parse(data); //now it an object
				var pushJson = JSON.parse(newConfig);
				if ( pushJson.index === undefined ) {
					obj.configService.push(pushJson); //add some data
				}
				else {
					obj.configService = obj.configService.map((x,index) => {
						if ( index === pushJson.index ) {
							delete pushJson.index;
							return pushJson;
						}
						else {
							return x;
						}
					})
				}
				const writeJson = JSON.stringify(obj); //convert it back to json
				fs.writeFile(this.configSrc, writeJson, 'utf8', (data) => {
					if ( data === null ) {
						connection.sendUTF(JSON.stringify(
							{
								type: 'saveConfig',
								data: {
									success: true,
									config:  JSON.parse(writeJson)
								}
							}
						));
					}
				}); // write it back
			}
		});
	};
	readConfig = (connection): void => {
		// TODO : add validator to json strings and keys
		fs.readFile(this.configSrc, 'utf8', (err, data): void => {
			if ( err ) {
				console.log(err);
			} else {
				let fileData=JSON.parse(data);
				for(let i=0;i<fileData.configService.length;i++){
					fileData.configService[i].id=(Math.random()*1e32).toString(36)
				}
				connection.sendUTF(JSON.stringify(
					{
						type: 'readConfig',
						data: {
							success: true,
							config:  fileData
						}
					}
				));
			}
		});
	};
	deleteConfig = (index, connection):void=> {
		if ( index === undefined ) {
			return;
		}
		index = parseInt(index); // convert to string to number;
		let obj = {
			configService: []
		};
		fs.readFile(this.configSrc, 'utf8', (err, data) => {
			if ( err ) {
				console.log(err);
			} else {
				let i = 0;
				JSON.parse(data).configService.filter(x => {
					if ( i !== index ) {
						obj.configService.push(x);
					}
					i++;


				});
				const writeJson = JSON.stringify(obj); //convert it back to json
				fs.writeFile(this.configSrc, writeJson, 'utf8', (data) => {
					if ( data === null ) {
						connection.sendUTF(JSON.stringify(
							{
								type: 'deleteConfig',
								data: {
									success: true,
									config:  JSON.parse(writeJson)
								}
							}
						));
					}
				}); // write it back
			}
		});
	};
}