const http = require("http");
const router = require("./scripts/router.js");
const port = 8000;
// create a web server.
const server = http.createServer((request, response) => {
  router.home(request, response);
});
server.listen(process.env.PORT || port);
console.log("Server listening at localhost:8000");
