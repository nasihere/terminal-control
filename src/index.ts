import { httpServer } from './Server/httpServer';
import { tempwsServer } from './Server/wsserver';

function runService() {

	httpServer.server.listen(httpServer.config.port, () => {
		console.log('Server running at http://localhost:'+httpServer.config.port+'/');
	});

	tempwsServer.httpserver.listen(tempwsServer.config.wsport, function () {
		// console.log((new Date()) + " Server is listening on port " + 1337);
	});
}
runService();