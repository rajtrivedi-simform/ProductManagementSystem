//helper functions for handling images

const imgToBase64 = (element) => {
  return new Promise((resolve, reject) => {
    const file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

let url = new URL(document.URL); //Get the URL of the current page
let uid = url.searchParams.get("uid"); //Fetch the uid from URL query parameters
let form = document.querySelector("form"); //Get the form element
let fileInput = document.querySelector('input[type="file"]'); //Get the file input element
let data = JSON.parse(localStorage.getItem(uid)); //Fetch the data from localStorage
var img = "";

//populate the form with data
if (data) {
  document.title += data.prodName;
  form.prodName.value = data.prodName;
  form.prodDesc.value = data.prodDesc;
  form.prodPrice.value = data.prodPrice;
  form.prodType.value = data.prodType;
  form.sellingType.value = data.sellingType;
  //   form.sellingType.value = data.sellingType;
  if (data.prodImage) {
    img = data.prodImage;
    document.querySelector(".prodImg").src = img;
    console.log(img);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault(); //Prevent the default form submission

  let formData = new FormData(form); //Create a new FormData object

  //Convert the file to base64 and add it to formData
  if (fileInput.files.length > 0) {
    const base64Image = await imgToBase64(fileInput);
    formData.append("prodImage", base64Image);
    formData.delete("prodImg"); //Remove the file object from formData
  } else {
    console.log("No new image uploaded");
    formData.append("prodImage", img); //If no new image is uploaded then use the original image present in the localstorage
    formData.delete("prodImg"); //Remove the file object from formData
  }

  let data = Object.fromEntries(formData); //Convert formData to an object
  console.log(data);
  try {
    localStorage.setItem(uid, JSON.stringify(data));
    alert("Product updated successfully!");
    form.reset();
    window.location.href = "/";
  } catch (err) {
    console.log(err);
  }
});
