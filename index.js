const express = require("express");
const pa11y = require("pa11y");
const PORT = process.env.PORT || 2225;

const app = express();

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
  index: ["index.html"],
  maxAge: "1m",
  redirect: false,
};

app.get("/api/check", async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ error: "URL required" });
  } else {
    try {
      const data = await pa11y(req.query.url);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
});

app.use(express.static("public", options));

app.use("*", (req, res) => {
  res
    .json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params,
    })
    .end();
});

module.exports = app;
