const http = require('http');

const host = 'localhost';
const port = 5000;

const requestListener= (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    res.statusCode = 200;
    res.end('<h1>Server</h1>');
}

const server = http.createServer(requestListener);
server.listen(port, host, ()=>console.log(`Server berjalan pada http://${host}:${port}`));
server.addListener('error', (error) => console.log(`Error ${error.message}`));
server.addListener('connection', (error) => console.log(`Connecting`));
server.addListener('connect', (error) => console.log(`Connected`));
server.addListener('listening', (error) => console.log(`Listening`));
server.addListener('Closed', () => console.log(`Closed`));
