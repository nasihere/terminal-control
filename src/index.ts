import { httpServer } from './httpServer';
import { tempwsServer } from './wsserver'

httpServer.listen(8125, () => {
	console.log('Server running at http://127.0.0.1:8125/');
});

tempwsServer.httpserver.listen(1337, function () {
	console.log((new Date()) + " Server is listening on port " + 1337);
});
