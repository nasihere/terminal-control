import { httpServer } from './Server/httpServer';
import { tempwsServer } from './Server/wsserver'
import {parseArgv} from './Server/utils';
const { port } = parseArgv();

// console.log(port, config);
function runService() {
	httpServer.listen(port, () => {
		console.log('Server running at http://localhost:'+port+'/');
	});

	tempwsServer.httpserver.listen(1337, function () {
		// console.log((new Date()) + " Server is listening on port " + 1337);
	});
}
runService();