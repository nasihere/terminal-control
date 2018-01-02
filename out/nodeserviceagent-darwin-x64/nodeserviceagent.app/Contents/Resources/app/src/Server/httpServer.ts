import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { ServerConfig } from "./lib/serverConfig";

function findContentType (extname) {
	switch (extname) {
		case '.js':
			return 'text/javascript';

		case '.css':
			return 'text/css';

		case '.json':
			return 'application/json';

		case '.png':
			return 'image/png';

		case '.jpg':
			return 'image/jpg';

		case '.wav':
			return 'audio/wav';

		default:
			return 'text/html'
	}

}
export class HttpServer extends ServerConfig{
	server:http.Server;
	constructor(){
		super();
		this.init();
	}
	init=()=>{
		this.server = http.createServer(this.handleRequests)
	}
	handleRequests=(request,response)=>{
		if (request.url === '/favicon.ico') {
			response.writeHead(200, {'Content-Type': 'image/x-icon'} );
			response.end();
			//console.log('favicon requested');
			return;
		}
		let requestConfig = {
			uri: url.parse(request.url).pathname,
			filePath: /\.\w{2,5}$/.test(request.url) ?  path.resolve(__dirname,'../htmlv3/'+ request.url ): path.resolve(__dirname,'../htmlv3/index.html') ,
			get filename() {return path.join(process.cwd(), this.uri)},
			get contentType(){return findContentType(path.extname(this.filePath))}
		}
		fs.readFile(requestConfig.filePath, function (error, content) {
			if (error) {
				console.log(`error on ${request.url}`,error)
				if (error.code === 'ENOENT') {
					fs.readFile('./404.html', function (error, content) {
						response.writeHead(200, {'Content-Type': requestConfig.contentType});
						response.end(content, 'utf-8');
					});
				}
				else {
					response.writeHead(500);
					response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
					response.end();
				}
			}
			else {
				response.writeHead(200, {'Content-Type': requestConfig.contentType});
				response.end(content, 'utf-8');
			}
		});
	}

}
export const httpServer=new HttpServer();


