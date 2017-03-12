"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpServer_1 = require("./httpServer");
const wsserver_1 = require("./wsserver");
httpServer_1.httpServer.listen(8125, () => {
    console.log('Server running at http://127.0.0.1:8125/');
});
wsserver_1.server.listen(1337, function () {
    console.log((new Date()) + " Server is listening on port " + 1337);
});
//# sourceMappingURL=index.js.map