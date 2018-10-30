import { httpServer } from './server/httpServer';
import { tempwsServer } from './server/wsserver';

function runService() {

	httpServer.server.listen(httpServer.config.port, () => {
		console.log(new Date().toJSON(), 'Server running at http://localhost:'+httpServer.config.port+'/');
	});

	tempwsServer.httpserver.listen(tempwsServer.config.wsport, function () {
		console.log((new Date().toJSON()) + " Ws Server is listening on port " + 1337);
	});
}
runService();