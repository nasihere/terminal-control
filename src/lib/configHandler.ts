import * as fs from 'fs';
import { isUndefined } from "util";

export class configHandler {
	configSrc: string;
	configFile: any;

	constructor (configSrc) {
		this.configSrc = configSrc;
	}

	saveConfig = function (newConfig, connection) {
		let obj = {
			configService: []
		};
		if(this.configFile){
			let pushJson = Object.assign({},newConfig.cmd,{ id:(Math.random() * 1e32).toString(36)});
			this.configFile.configService.push(pushJson);console.log(this.configFile)
			fs.writeFile(this.configSrc, JSON.stringify(this.configFile), 'utf8', (data) => {
				if ( data === null ) {
					connection.sendUTF(JSON.stringify(
						{
							type: 'saveConfig',
							data: {
								success: true,
								config:  this.configFile
							}
						}
					));
				}
			});
			return;
		}
		fs.readFile(this.configSrc, 'utf8', (err, data) => {
			if ( err ) {
				console.log(err);
			}

			else {
				obj = JSON.parse(data); //now it an object
				let pushJson = Object.assign({},newConfig.cmd,{ id:(Math.random() * 1e32).toString(36)});

				if ( pushJson.index === undefined ) {
					obj.configService.push(pushJson); //add some data
				}
				else {
					obj.configService = obj.configService.map((x, index) => {
						if ( index === pushJson.index ) {
							delete pushJson.index;
							return pushJson;
						}
						else {
							return x;
						}
					})
				}
				const writeJson = JSON.stringify(obj);

				//convert it back to json
				fs.writeFile(this.configSrc, writeJson, 'utf8', (data) => {
					if ( data === null ) {
						connection.sendUTF(JSON.stringify(
							{
								type: 'saveConfig',
								data: {
									success: true,
									config:  obj
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
				let fileData = JSON.parse(data);
				if ( isUndefined(this.configFile) ) {
					for ( let i = 0; i < fileData.configService.length; i++ ) {
						fileData.configService[ i ].id = (Math.random() * 1e32).toString(36);
					}
					this.configFile = fileData
				}
				else {
					for ( let i = 0; i < fileData.configService.length; i++ ) {

						let keyLength = Object.keys(fileData.configService[ i ]).length;
						let testLength = 0;
						for ( let key in fileData.configService[ i ] ) {
							if ( fileData.configService[ i ][ key ] === this.configFile.configService[ i ][ key ] ) {
								++testLength
							}
						}
						let simpatico = keyLength == testLength;
						if ( !simpatico ) {
							fileData.configService[ i ].id = (Math.random() * 1e32).toString(36);
							this.configFile.splice(i, 0, fileData.configService[ i ]);
						}
					}
				}

				connection.sendUTF(JSON.stringify(
					{
						type: 'readConfig',
						data: {
							success: true,
							config:  this.configFile
						}
					}
				));
			}
		});
	};
	deleteConfig = (index, connection): void => {
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