let url = new URL(document.URL); //Get the URL of the current page
let uid = url.searchParams.get("uid"); //Fetch the uid from URL query parameters
//
let { prodImage, prodName, prodDesc, prodPrice, prodType, sellingType } =
  JSON.parse(localStorage.getItem(uid));

//References of HTML Elements
const img = document.querySelector("img");
const name = document.querySelector(".prodName");
const desc = document.querySelector(".description");
const price = document.querySelector(".price");
const sellingtype = document.querySelector(".sellingType");
const prodtype = document.querySelector(".prodType");

document.addEventListener("DOMContentLoaded", (e) => {
  img.src = prodImage;
  img.alt = prodName;
  name.innerHTML = prodName;
  desc.innerHTML = prodDesc;
  price.innerHTML = "₹" + prodPrice;
  sellingtype.innerHTML = sellingType;
  prodtype.innerHTML = prodType;
  document.querySelector(".edit").href = "./templates/edit.html?uid=" + uid;
  document.querySelector(".btn-danger").addEventListener("click", () => {
    if (confirm("Do you want to delete this product?")) {
      if (confirm("Are you really sure about that?")) {
        localStorage.removeItem(uid);
        document.location.href = "/ProductManagementSystem/";
        // window.location.href = "/";
      }
    }
  });
});

// {
//     "prodName": "JS Framework",
//     "prodDesc": "Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.",
//     "prodPrice": "1000",
//     "prodType": "Utilities",
//     "sellingType": "retail",
//     "prodImage": "Image BASE_64 string"
// }
