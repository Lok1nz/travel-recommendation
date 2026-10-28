const input = document.getElementById("searchInput");
const results = document.getElementById("results");

function render(items) {
  results.innerHTML = "";
  if (!items.length) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  }
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>`;
    results.appendChild(card);
  });
}

function search() {
  const keyword = input.value.trim().toLowerCase();
  if (!keyword) return;

  fetch("travel_recommendation_api.json")
    .then(res => res.json())
    .then(data => {
      let items = [];
      if (keyword.startsWith("beach")) {
        items = data.beaches;
      } else if (keyword.startsWith("temple")) {
        items = data.temples;
      } else if (keyword.startsWith("countr")) {
        data.countries.forEach(c => items.push(...c.cities));
      } else {
        data.countries.forEach(c => {
          if (c.name.toLowerCase().includes(keyword)) items.push(...c.cities);
        });
      }
      render(items);
    })
    .catch(err => console.error("Error:", err));
}

document.getElementById("searchBtn").addEventListener("click", search);
document.getElementById("clearBtn").addEventListener("click", () => {
  input.value = "";
  results.innerHTML = "";
});