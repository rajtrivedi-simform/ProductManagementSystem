const form = document.querySelector("form"); // Get the form element
const fileInput = document.querySelector('input[type="file"]'); // Get the file input element

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form); // Create a new FormData object

  // Convert the file to base64 and add it to formData
  const base64Image = await imgToBase64(fileInput);
  formData.append("prodImage", base64Image);
  formData.delete("prodImg"); // Remove the file object from formData
  console.log(formData);

  const data = Object.fromEntries(formData); // Convert formData to an object
  console.log(data);

  console.log(data, generateUUID());

  try {
    localStorage.setItem("prod-" + generateUUID(), JSON.stringify(data));
    alert("Product added successfully!");
    form.reset();
    window.location.href = "/";
  } catch (err) {
    console.log(err);
  }
});

// Generate unique key
function generateUUID() {
  return "xxxx-xxxx".replace(/[x]/g, function () {
    return Math.floor(Math.random() * 16).toString(16);
  });
}

// Image handling logic
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
