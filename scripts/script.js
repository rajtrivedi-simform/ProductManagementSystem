const search = document.querySelector(".search");

const loadHTML = () => {
  const table = document.querySelector(".content-div");
  const keys = Object.keys(localStorage);
  let html = ``;
  keys.filter((key) => key.startsWith("prod-"));

  if (keys.length > 0) {
    let count = 0;
    html = `<div class="d-flex justify-content-around align-items-start">
              <h2 class="mb-4">Product List</h2>
              <a class="btn btn-primary" href="/templates/add.html">Add Product</a>
            </div>
            <div class="container-fluid d-flex justify-content-evenly flex-wrap align-items-baseline">`;
    keys.forEach((key) => {
      let data = localStorage.getItem(key);
      data = JSON.parse(data);
      console.log(key);

      html += `<div class="card border border-dark m-3" style="width: 18rem;">
                  <img src="${data.prodImage}" class="card-img-top" alt="${data.prodName}" width="250px" height="250px">
                    <div class="card-body">
                      <h5 class="card-title">${data.prodName}</h5>
                      <p class="card-text text-truncate">${data.prodDesc}</p>
                      <a href="/templates/edit.html?uid=${key}" class="btn btn-primary">Edit</a>
                      <button class="btn btn-danger" onclick="removeProduct('${key}')">Delete</button><br>
                      <a href="/templates/page.html?uid=${key}" class="btn btn-primary mt-1 pe-5 ps-5">view</a>
                    </div>
                </div>`;
    });

    html += ``;
  } else {
    html = `<div class="d-flex justify-content-around align-items-center">
              <h2 class="mt-5 mb-4">No Products Found</h2>
              <a class="btn btn-primary" href="/templates/add.html">Add Product</a>
            </div>`;
  }

  table.innerHTML = html;
};

const removeProduct = (key) => {
  if (confirm("Do you want to delete this product?")) {
    if (confirm("Are you really sure about that?")) {
      localStorage.removeItem(key);
      loadHTML();
    }
  }
};

const searchprod = (prodName) => {
  if (!prodName) {
    loadHTML();
  } else {
    const data = document.querySelectorAll(".card-title");

    data.forEach((element) => {
      console.log(element.innerHTML);
      if (!element.innerHTML.toLowerCase().includes(prodName)) {
        element.parentElement.parentElement.style.display = "none";
      }
    });
  }
};

search.addEventListener("keyup", (e) => {
  debounce(searchprod(e.target.value));
});

function debounce(func, timeout = 3000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

document.onload = loadHTML();
