const express = require("express");
const pa11y = require("pa11y");
const PORT = process.env.PORT || 2225;

const app = express();

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

app.use(express.static("public"));

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
