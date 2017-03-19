import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

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

export const httpServer=http.createServer((request, response)=> {
	if (request.url === '/favicon.ico') {
		response.writeHead(200, {'Content-Type': 'image/x-icon'} );
		response.end();
		console.log('favicon requested');
		return;
	}
	// console.log(`fetching ${request.url}`);
	let requestConfig = {
		uri: url.parse(request.url).pathname,
		filePath: request.url === "/" ? 'build/htmlv3/index.html' : 'build/htmlv3/'+ request.url,
		get filename() {return path.join(process.cwd(), this.uri)},
		get contentType(){return findContentType(path.extname(this.filePath))}
	}

	fs.readFile(requestConfig.filePath, function (error, content) {
		if (error) {
			console.log(`error on ${request.url}`)
			if (error.code == 'ENOENT') {
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
			// console.log(`fetched ${request.url}`);
			response.end(content, 'utf-8');
		}
	});

})


