
import * as rc from "rc";
export interface IParseArgv {
	port: number;
	wsport:number;
	configPath: string;
}
export class ServerConfig {
	config: IParseArgv;
	private defaults = {
		port:       8125,
		wsport:     1337,
		configPath: "build/app-config.json"
	}

	constructor () {

		let config = rc('nodeagents', this.defaults)
		// cmd line config
		if ( process.argv.length > 2 ) {
			process.argv.slice(2).forEach(x => {
				const param = x.split('=');
				switch ( param[ 0 ] ) {
					case "--port":
						config.port = parseInt(param[ 1 ]);
						break;
					case "--wsport":
						config.wsport = parseInt(param[ 1 ]);
						break;
					case "--config":
						config.configPath = param[ 1 ];
						break;
				}
			});
		}
		this.config=config;
	}
}