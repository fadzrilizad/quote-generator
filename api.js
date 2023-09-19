const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let data = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function stopLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function newQuote() {
  let author = data.quoteAuthor;
  if (author === "") {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = author;
  }
  let charLen = data.quoteText.length;
  if (charLen > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = data.quoteText;
  stopLoadingSpinner();
}

// Get quote from api
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://corsproxy.io/?";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    data = await response.json();
    newQuote();
  } catch (error) {
    getQuote();
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Add event listerner
twitterBtn.addEventListener("click", tweetQuote);
quoteBtn.addEventListener("click", getQuote);

getQuote();
