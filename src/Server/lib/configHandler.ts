import * as fs from 'fs';
import { isUndefined } from "util";
import { IParseArgv } from "./serverConfig";

export class configHandler {
	configSrc: string;
	configFile: any;

	constructor (config:IParseArgv) {
		this.configSrc = config.configPath;
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
	private setId = (items:Array<any>) => {
		for ( let i = 0; i < items.length; i++ ) {
			items[ i ].id = (Math.random() * 1e32).toString(36);
		}
		return items;
	}
	private sendFail = (e:Error, connection, type:string) => {
		connection.sendUTF(JSON.stringify(
			{
				type: type,
				data: {
					success: false,
					error: e
				}
			}
		));
	}
	private sendSuccess = (connection,type:string, data:any)=>{
		connection.sendUTF(JSON.stringify(
			{
				type: type,
				data: {
					success: true,
					config:  data
				}
			}
		));
	}
	saveConfig = function (newConfig, connection) {
		let obj = {
			configService: []
		};
		if ( this.configFile ) {
			let pushJson = Object.assign({}, newConfig.cmd, {id: (Math.random() * 1e32).toString(36)});
			this.configFile.configService.push(pushJson);
			this.writeFile(this.configSrc,JSON.stringify(this.configFile,null,"\t")).then(()=>{
				this.sendSuccess(connection,'saveConfig',this.configFile)
			}).catch((e)=>{
				this.sendFail(e,connection,'saveConfig')
			});
			return;
		}

	};
	readConfig = (connection): void => {
		// TODO : add validator to json strings and keys
		this.readFile(this.configSrc).then((data) => {
			try {
				let fileData = JSON.parse(data);
				if ( isUndefined(this.configFile) ) {
					fileData.configService=this.setId(fileData.configService);
					this.configFile = fileData
				}
				else {
					for ( let i = 0; i < fileData.configService.length; i++ ) {
						let currentItem=fileData.configService[i];
						let keyLength = Object.keys(currentItem).length;
						let testLength = 0;

						for ( let key in currentItem ) {
							if ( currentItem[ key ] === this.configFile.configService[ i ][ key ] ) {
								testLength++;
							}
						}

						if ( keyLength == testLength ) {
							currentItem.id = (Math.random() * 1e32).toString(36);
							if (this.configFile.length) {
								this.configFile.splice(i, 0, currentItem);
							}
						}
					}
				}
				this.sendSuccess(connection,"readConfig",this.configFile)
			}
			catch ( e ) {
				throw e
			}
		}).catch((e) => {
			this.sendFail(e, connection, 'readConfig')
		})
	};
	editConfig = (message, connection):void => {
		let configItem = message.cmd;

		if ( this.configFile ) {
			let _items = this.configFile.configService.map((item) => {
				if ( item.id === configItem.id ) {
					for ( let key in item ) {
						if ( item[ key ] !== configItem[ key ] ) {
							item[ key ] = configItem[ key ]
						}
					}
					return item;
				}
				else {
					return item;
				};
			})
			this.configFile.configService = _items;
			const writeJson = JSON.stringify(this.configFile,null,"\t");
			this.writeFile(this.configSrc,writeJson).then((data)=>{
				this.sendSuccess(connection,"updateConfig",this.configFile)
			}).catch((e)=>{
				this.sendFail(e,connection,'updateConfig');
			})
		}
		else{
			this.readFile(this.configSrc).then((data)=>{
				try {
					let fileData = JSON.parse(data);
					fileData.configService=this.setId(fileData.configService);
					this.configFile=fileData;
					this.sendSuccess(connection,'updateConfig',this.configFile)
				}
				catch(e){
					throw e
				}
			}).catch((e)=>{
				this.sendFail(e,connection,'updateConfig')
			})
		}
	}
	deleteConfig = (message, connection): void => {
		let configItem = message.cmd;
		if ( this.configFile ) {
			let idx = this.configFile.configService.findIndex((item, idx) => item.id === configItem.id);

			if ( idx !== -1 ) {
				this.readFile(this.configSrc).then((data)=>{
					try{
						let fileData = JSON.parse(data)
						fileData.configService.splice(idx, 1);
						this.configFile = fileData
						const writeJson = JSON.stringify(this.configFile,null,"\t");
						this.writeFile(this.configSrc, writeJson).then(()=>{
							this.sendSuccess(connection,'deleteConfig',this.configFile)
						})
					}
					catch(e){this.sendFail(e,connection,'deleteConfig')}
				});
			}
		}

	};
}