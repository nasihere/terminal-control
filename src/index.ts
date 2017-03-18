import { httpServer } from './httpServer';
import { tempwsServer } from './wsserver'
const PORT = (process.argv.length > 2) ? process.argv.slice(2)[0] : 8125;

function runService() {
	httpServer.listen(PORT, () => {
		console.log('Server running at http://localhost:'+PORT+'/');
	});

	tempwsServer.httpserver.listen(1337, function () {
		console.log((new Date()) + " Server is listening on port " + 1337);
	});
}
runService();