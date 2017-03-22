export function parseArgv() {
	let fetchPort = 8125;
	let fetctConfig = "build/htmlv2/app/app-config.json";
	if (process.argv.length > 2){
		process.argv.slice(2).forEach(x=>{
			const param = x.split('=');
			switch(param[0]){
				case "--port":
					fetchPort = parseInt(param[1]);
					break;
				case "--config":
					fetctConfig = param[1];
					break;
			}
		});
	}
	return {
		port: fetchPort,
		configPath: fetctConfig
	}
}