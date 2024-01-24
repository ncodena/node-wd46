
const http = require("node:http");
const PORT = 8000;

const server = http.createServer((req, res) => {
    console.log(req.url, 'url')
    if(req.url === '/testRoute'){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const data = {
            message: "Hello test route",
            timestamp: new Date().toISOString()
        };

        const jsonData = JSON.stringify(data);
        res.end(jsonData)
    } else if(req.url === "/"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const data = {
            message: "Hello root route",
            timestamp: new Date().toISOString()
        };

        const jsonData = JSON.stringify(data);
        res.end(jsonData)
    }else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");

        const data = {
            message: "the resource does not exist",
            timestamp: new Date().toISOString()
        };

        const jsonData = JSON.stringify(data);
        res.end(jsonData)
    }
    
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})