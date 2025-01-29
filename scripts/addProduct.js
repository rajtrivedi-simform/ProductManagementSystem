const form = document.querySelector("form"); // Get the form element

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form); // Create a new FormData object
  const data = Object.fromEntries(formData); // Convert formData to an object

  console.log(data, generateUUID());

  try {
    localStorage.setItem("prod-" + generateUUID(), JSON.stringify(data));
    alert("Product added successfully!");
    form.reset();
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
