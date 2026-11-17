const form = document.getElementById("search-form");
const input = document.getElementById("input");
const button = document.getElementById("button");
const results = document.getElementById("results");
const resultCount = document.getElementById("result-count");
const gallery = document.querySelector(".gallery-section");

async function searchImages(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php" +
    "?action=query&format=json&origin=*&generator=search" +
    "&gsrnamespace=6&gsrlimit=18&gsrsearch=" + encodeURIComponent(query) +
    "&prop=imageinfo&iiprop=url|size&iiurlwidth=640";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Image search request failed: " + response.status);
  }

  const data = await response.json();
  return Object.values(data.query?.pages || {});
}

function showLoading(query) {
  gallery.setAttribute("aria-busy", "true");
  resultCount.textContent = `Searching for “${query}”…`;
  results.innerHTML = "";

  const loading = document.createElement("div");
  loading.className = "loading-state";
  loading.setAttribute("role", "status");

  const spinner = document.createElement("span");
  spinner.className = "spinner";
  spinner.setAttribute("aria-hidden", "true");

  const message = document.createElement("span");
  message.textContent = `Finding images for “${query}”…`;

  loading.appendChild(spinner);
  loading.appendChild(message);
  results.appendChild(loading);
}

function showMessage(titleText, detailText, className = "empty-state") {
  results.innerHTML = "";
  const state = document.createElement("div");
  state.className = className;

  const title = document.createElement("h3");
  title.textContent = titleText;
  const detail = document.createElement("p");
  detail.textContent = detailText;

  state.appendChild(title);
  state.appendChild(detail);
  results.appendChild(state);
}

function renderImages(items, query) {
  results.innerHTML = "";

  if (items.length === 0) {
    resultCount.textContent = "0 results";
    showMessage(
      `No results for “${query}”.`,
      "Try another search or choose one of the suggested topics."
    );
    return;
  }

  resultCount.textContent = `Showing ${items.length} results for “${query}”`;

  let renderedCount = 0;
  items.forEach((item) => {
    const imageInfo = item.imageinfo?.[0];
    if (!imageInfo?.thumburl && !imageInfo?.url) return;

    const card = document.createElement("article");
    card.className = "image-card";

    // Enhancement: open the full-size original image in a new tab.
    const link = document.createElement("a");
    link.className = "image-link";
    link.href = imageInfo.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = "Open full-size image in a new tab";

    const image = document.createElement("img");
    image.src = imageInfo.thumburl || imageInfo.url;
    image.alt = item.title.replace(/^File:/, "").replaceAll("_", " ");
    image.loading = "lazy";

    const copy = document.createElement("div");
    copy.className = "card-copy";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.title.replace(/^File:/, "").replaceAll("_", " ");

    const meta = document.createElement("p");
    meta.className = "card-meta";
    const width = imageInfo.width;
    const height = imageInfo.height;
    meta.textContent = width && height
      ? `${width} × ${height} px · Wikimedia Commons`
      : "Wikimedia Commons";

    copy.appendChild(title);
    copy.appendChild(meta);
    link.appendChild(image);
    link.appendChild(copy);
    card.appendChild(link);
    results.appendChild(card);
    renderedCount += 1;
  });

  if (renderedCount === 0) {
    resultCount.textContent = "0 displayable images";
    showMessage("No displayable images found.", "Please try another search.");
  } else if (renderedCount !== items.length) {
    resultCount.textContent = `Showing ${renderedCount} images for “${query}”`;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  button.disabled = true;
  button.textContent = "Searching…";
  showLoading(query); // Visible immediately, before the fetch starts.

  try {
    const items = await searchImages(query);
    renderImages(items, query);
  } catch (error) {
    console.error("Image search error:", error);
    resultCount.textContent = "Search failed";
    showMessage(
      "Something went wrong.",
      "We couldn't load images right now. Check your connection and try again."
    );
  } finally {
    gallery.setAttribute("aria-busy", "false");
    button.disabled = false;
    button.innerHTML = 'Search <span aria-hidden="true">→</span>';
  }
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    input.value = chip.dataset.query;
    form.requestSubmit();
  });
});
