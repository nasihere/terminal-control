import { httpServer } from './httpServer';
import { tempwsServer } from './wsserver'
import {parseArgv} from './utils/stringifyHtml';
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