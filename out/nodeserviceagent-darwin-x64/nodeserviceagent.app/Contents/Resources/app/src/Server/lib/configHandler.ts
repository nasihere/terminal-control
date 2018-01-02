import * as fs from 'fs';
import { isUndefined } from "util";
import { IParseArgv } from "./serverConfig";
import { getNpmScripts, getReadme } from "./ReadFiles";

export class configHandler {
	configSrc: string;
	configFile: any;

	constructor (config: IParseArgv) {
		this.configSrc = config.configPath;
		this.defaultConfig();
	}

	private writeFile = (filePath, str: string): Promise<any> => {
		return new Promise((resolve, reject) => {
			fs.writeFile(filePath, str, 'utf8', (err) => {
				if ( err ) {
					reject(err);
					return;
				}
				else {
					resolve()
				}
			})
		})
	}
	private readFile = (filePath): Promise<any> => {
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, 'utf8', (err, data): void => {

				if ( err ) {
					reject(err)
				}
				else {
					resolve(data);
				}
			})
		})
	};
	private setId = (items: Array<any>) => {
		return new Promise((resolve, reject) => {
			let newItems = items.map(item => {
				item.id = (Math.random() * 1e32).toString(36);
				item.pid = null;
				return item;
			});
			resolve(newItems);
		})

	};
	private async pullNpmScripts (item: any): Promise<Array<any>> {
		let npm = await getNpmScripts(item.cd)
		item.npm = npm;
		console.log('pull npm script')
		console.log(JSON.stringify(item))
		return item;
	}

	private async setNpmScripts (items: Array<any>): Promise<Array<any>> {
		for ( let i = 0; i < items.length; i++ ) {
			let npm = await getNpmScripts(items[ i ].cd)
			items[ i ].npm = npm;
		}
		return items;
	}
	private async getReadMeContent (items: Array<any>): Promise<Array<any>> {
		for ( let i = 0; i < items.length; i++ ) {
			let readMe = await getReadme(items[ i ].cd)
			items[ i ].readMe = readMe;
			//console.log(items[ i ]);
		}
		return items;
	}

	private sendFail = (e: Error, connection, type: string) => {
		connection.sendUTF(JSON.stringify(
			{
				type: type,
				data: {
					success: false,
					error:   e
				}
			}
		));
	}
	private sendSuccess = (connection, type: string, data: any) => {
		connection.sendUTF(JSON.stringify(
			{
				type: type,
				data: {
					success: true,
					config:  data
				}
			}
		));
	};
	private defaultConfig = function () {
		if ( !fs.existsSync(this.configSrc) ) {
			console.info('Default config created', this.configSrc);
			this.writeFile(this.configSrc, '{"configService": []}');

		}
	};
	extraConfig = function (statusObj) {
		this.configFile.configService = this.configFile.configService.map((item) => {
			if ( item.id === statusObj.id ) {
				return {
					...item,
					...statusObj
				}
			}
			else {
				return item;
			}
		});

	};
	saveConfig = async function (newConfig, connection) {
		if ( true ) {
			newConfig = await this.pullNpmScripts(newConfig.cmd)
			newConfig.id  = (Math.random() * 1e32).toString(36);
			console.log('SaveConfig');
			console.log('-'.repeat(100));
			console.log(JSON.stringify(newConfig))

			this.configFile.configService.push(newConfig);
			// console.log('--'.repeat(200), JSON.stringify(this.configFile.configService), '-'.repeat(200));
			this.writeFile(this.configSrc, JSON.stringify(this.configFile, null, "\t")).then(() => {
				// console.log('new save config', JSON.stringify(this.configFile))
				this.sendSuccess(connection, 'saveConfig', this.configFile)
			}).catch((e) => {
				this.sendFail(e, connection, 'saveConfig')
			});
			return;
		}

	};
	readConfig = (connection): void => {
		// TODO : add validator to json strings and keys
		console.log('this.configSrc', this.configSrc)
		this.readFile(this.configSrc).then((data) => {
			try {
				console.log('Reading Config from:', this.configSrc);
				let fileData = JSON.parse(data);
				if ( isUndefined(this.configFile) ) { //isUndefined(this.configFile)
					console.log('isUnDefined:', this.configSrc);
					this.setId(fileData.configService)
						.then(this.setNpmScripts)
						.then(this.getReadMeContent)
						.then((configService) => {
							fileData.configService=configService
							this.configFile = fileData;
							console.log({"status":200, "message": "CONN_SUCC_SEND_CONFIG", "data":fileData});
							this.sendSuccess(connection, "readConfig", this.configFile)

						})
						.catch((e) => {
							console.log({"status":204, "message": "CONN_ERR_READ_CONFIG", "data":e});
							console.error(e)
						});
				}
				else {
					for ( let i = 0; i < fileData.configService.length; i++ ) {
						let currentItem = fileData.configService[ i ];
						let keyLength = Object.keys(currentItem).length;
						let testLength = 0;

						for ( let key in currentItem ) {
							if ( currentItem[ key ] === this.configFile.configService[ i ][ key ] ) {
								testLength++;
							}
						}

						if ( keyLength == testLength ) {
							currentItem.id = (Math.random() * 1e32).toString(36);
							if ( this.configFile.length ) {
								this.configFile.splice(i, 0, currentItem);
							}
						}
					}
					console.log('New Config Sent', JSON.stringify(this.configFile))
					this.sendSuccess(connection, "readConfig", this.configFile)
				}

			}
			catch ( e ) {
				throw e
			}
		}).catch((e) => {
			this.sendFail(e, connection, 'readConfig')

		})

	};
	editConfig = (message, connection): void => {
		let configItem = message.cmd;

		if ( this.configFile ) {
			let _items = this.configFile.configService.map((item) => {
				if ( item.id === configItem.id ) {
					// for ( let key in item ) {
					// 	if ( item[ key ] !== configItem[ key ] ) {
					// 		item[ key ] = configItem[ key ]
					// 	}
					// }
					// return item;
					item['env'] = configItem['env'];
					item['command'] = configItem['command'];
					return item;
				}
				else {
					return item;
				}
				;
			})
			console.log('editConfig');
			console.log(_items);
			this.configFile.configService = _items;
			const writeJson = JSON.stringify(this.configFile, null, "\t");
			this.writeFile(this.configSrc, writeJson).then((data) => {
				this.sendSuccess(connection, "updateConfig", this.configFile)
			}).catch((e) => {
				this.sendFail(e, connection, 'updateConfig');
			})
		}
		else {
			this.readFile(this.configSrc).then((data) => {
				try {
					let fileData = JSON.parse(data);
					fileData.configService = this.setId(fileData.configService);
					this.configFile = fileData;
					this.sendSuccess(connection, 'updateConfig', this.configFile)
				}
				catch ( e ) {
					throw e
				}
			}).catch((e) => {
				this.sendFail(e, connection, 'updateConfig')
			})
		}
	}
	deleteConfig = (message, connection): void => {
		let configItem = message.cmd;
		if ( this.configFile ) {
			let idx = this.configFile.configService.findIndex((item, idx) => item.id === configItem.id);

			if ( idx !== -1 ) {
				this.readFile(this.configSrc).then((data) => {
					try {
						let fileData = JSON.parse(data)
						fileData.configService.splice(idx, 1);
						this.configFile = fileData
						const writeJson = JSON.stringify(this.configFile, null, "\t");
						this.writeFile(this.configSrc, writeJson).then(() => {
							this.sendSuccess(connection, 'deleteConfig', this.configFile)
						})
					}
					catch ( e ) {
						this.sendFail(e, connection, 'deleteConfig')
					}
				});
			}
		}

	};
}