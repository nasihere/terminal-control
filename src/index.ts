import {httpServer} from './httpServer';
import {server} from './wsserver'

httpServer.listen(8125, ()=>{
	console.log('Server running at http://127.0.0.1:8125/');
});

server.listen(1337, function() {
	console.log((new Date()) + " Server is listening on port " + 1337);
});
