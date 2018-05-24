const listen = require('./listen');
const broadcast = require('./broadcast');

const listenSrv = listen();
const broadcastSrv = broadcast();
listenSrv.listen(8080);
broadcastSrv.httpSrv.listen(8081);