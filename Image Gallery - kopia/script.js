const fileInput = document.getElementById("file-input");
const uploadBtn = document.getElementById("upload-btn");
const gallery = document.querySelector(".gallery");
const modal = document.querySelector(".modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.querySelector(".close");

// Function to update the gallery with stored images
function loadImages() {
    const storedImages = JSON.parse(localStorage.getItem("images")) || [];
    gallery.innerHTML = ""; // Clear the current gallery

    storedImages.forEach((imageSrc, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");
        imgContainer.innerHTML = `
            <img src="${imageSrc}" alt="Image" onclick="openModal(this.src)">
            <button class="close-btn" onclick="removeImage(${index})">&times;</button>
        `;
        gallery.appendChild(imgContainer);
    });
}

// Function to upload images
uploadBtn.addEventListener("click", () => {
    const files = fileInput.files;
    if (files.length === 0) {
        alert("Please select at least one image file.");
        return;
    }

    const storedImages = JSON.parse(localStorage.getItem("images")) || [];

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;
            storedImages.push(imageSrc);
            localStorage.setItem("images", JSON.stringify(storedImages));
            loadImages(); // Update gallery after adding new image
        };
        reader.readAsDataURL(files[i]);
    }
    // Clear the input after uploading
    fileInput.value = '';
});

// Function to remove an image from the gallery
function removeImage(index) {
    const storedImages = JSON.parse(localStorage.getItem("images")) || [];
    storedImages.splice(index, 1); // Remove the image at the specified index
    localStorage.setItem("images", JSON.stringify(storedImages));
    loadImages(); // Reload the images
}

// Function to open the modal
function openModal(src) {
    modal.style.display = "block";
    modalImg.src = src;
}

// Function to close the modal
closeModal.onclick = function () {
    modal.style.display = "none";
};

// Load images on page load
window.onload = loadImages;
