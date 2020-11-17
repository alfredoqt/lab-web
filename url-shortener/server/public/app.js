function postURL(url) {
  return fetch("/urls", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ longUrl: url.longUrl }),
  }).then((response) => response.json());
}

async function storeURL() {
  try {
    const longUrl = document.querySelector("#url_input").value;
    // TODO: Validate URL
    const result = await postURL({ longUrl });
    // Manually update HTML
    document.querySelector("#url_input").value = "";

    document.querySelector(
      "#url_shortened"
    ).innerHTML = `Generated URL: ${result.data.shortUrl}`;
  } catch (e) {
    // TODO: Handle the error properly
    throw new Error("URL could not be added");
  }
}
