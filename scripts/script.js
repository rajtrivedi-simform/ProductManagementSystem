const loadHTML = () => {
  const table = document.querySelector(".table");
  const keys = Object.keys(localStorage);
  let html = ``;
  keys.filter((key) => key.startsWith("prod-"));

  if (keys) {
    let count = 0;
    html = `<tr>
          <td>Sr No.</td>
          <td>Name</td>
          <td>Description</td>
          <td>Price</td>
          <td>Image</td>
          <td>Category</td>
          <td>Selling Type</td>
          <td>Actions</td>
        </tr>`;
    keys.forEach((key) => {
      let data = localStorage.getItem(key);
      html += `<tr>
          <td>${count++}</td>
          <td>${data.prodName}</td>
          <td>${data.prodDesc}</td>
          <td>${data.prodPrice}</td>
          <td><img src="" alt="${data.prodName}"></img></td>
          <td>${data.prodType}</td>
          <td>${data.sellingType}</td>
          <td>
            <a href="/templates/edit.html?uid=${key}" class="btn btn-danger">Edit</a>
            <a href="${remvoeProduct(key)}" class="btn btn-danger">Remove</a>
          </td>
      </tr>`;
    });
  }
};

const remvoeProduct = (key) => {
  localStorage.removeItem(key);
  loadHTML();
};

document.onload = loadHTML();

