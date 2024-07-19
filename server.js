const {createServer} = require("http");
const {parse} = require("url");
const next = require("next");

const dev = process.env.NEXT_PUBLIC_REACT_APP_ENV || process.env.NODE_ENV !== "production";
const hostname = process.env.NEXT_PUBLIC_REACT_APP_ENV || process.env.NODE_ENV !== "production" ? "localhost" : "sportygalaxy.com";
const port = process.env.NEXT_PUBLIC_REACT_PORT || process.env.PORT || 3000;

const app = next({dev, hostname, port});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const {pathname, query} = parsedUrl;
      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, (err) => {
      // if (err) throw err
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});