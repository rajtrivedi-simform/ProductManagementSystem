const loadHTML = () => {
  const table = document.querySelector(".content-div");
  const keys = Object.keys(localStorage);
  let html = ``;
  keys.filter((key) => key.startsWith("prod-"));

  if (keys.length > 0) {
    let count = 0;
    html = `<div class="d-flex justify-content-around align-items-center"><h2 class="mt-5 mb-4">Product List</h2><a class="btn btn-primary" href="/templates/add.html">Add Product</a></div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Type</th>
            <th scope="col">Selling Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody id="productTableBody">`;
    keys.forEach((key) => {
      let data = localStorage.getItem(key);
      data = JSON.parse(data);
      console.log(data);

      html += `<tr>
          <td>${++count}</td>
          <td>${data.prodName}</td>
          <td>${data.prodDesc}</td>
          <td>${data.prodPrice}</td>
          <td><img src="${data.prodImage}" alt="${
        data.prodName
      }" height="100px" width="100px"></img></td>
          <td>${data.prodType}</td>
          <td>${data.sellingType}</td>
          <td>
            <a href="/templates/edit.html?uid=${key}" class="btn btn-primary mb-1">Edit</a>
            <a onClick="removeProduct(${key})" class="btn btn-danger">Delete</a>
          </td>
      </tr>`;
    });

    html += `</tbody></table>`;
  } else {
    html = `<h2>No Products Found</h2> <a href="/templates/add.html" class="btn btn-primary">Add Product</a>`;
  }

  table.innerHTML = html;
};

const remvoeProduct = (key) => {
  localStorage.removeItem(key);
  loadHTML();
};

document.onload = loadHTML();
