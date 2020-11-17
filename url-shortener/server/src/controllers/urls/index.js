const { nanoid } = require("nanoid");

const URL = require("../../models/URL");
const appConfig = require("../../configs/app");

async function postOne(request, response) {
  const { longUrl } = request.body;
  // TODO: Remove hardcoded host
  const shortUrl = `http://localhost:${appConfig.serverPort}/${nanoid(5)}`;
  const insert = await URL.insertOne({ longUrl, shortUrl });
  const inserted = await URL.getOne(insert[0]);

  response.send({ data: inserted });
}

async function redirect(req, res) {
  const shortenedId = req.params.id;
  const redirectUrl = `http://localhost:${appConfig.serverPort}/${shortenedId}`;
  // Check if the user wants to know more details
  if (shortenedId[shortenedId.length - 1] === "+") {
    const url = await URL.getOneWithShortUrl(redirectUrl.slice(0, -1));
    res.render("homepage/index", { url });
  } else {
    const url = await URL.getOneWithShortUrl(redirectUrl);
    // I'm not sure if it'll be null or undefined
    if (url != null) {
      await URL.updateShortenedCount(url.id, url.redirectCount + 1);
      res.redirect(url.longUrl);
    }
  }
}

module.exports = {
  postOne,
  redirect,
};
