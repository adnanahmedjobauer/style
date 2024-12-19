document.addEventListener("DOMContentLoaded", () => {
  // Elements Selection
  const postForm = document.getElementById("postForm");
  const addImg = document.getElementById("add_img");
  const postImg = document.getElementById("post_img");
  const submitButton = document.getElementById("submitButton");
  const removeImgButton = document.getElementById("rmImg");
  const placeholderImg = "placeholder.jpg";

  /**
   * Show image preview after selecting a valid image file.
   */
  const showImagePreview = () => {
    const file = addImg.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      postImg.src = imageUrl;
      removeImgButton.style.display = "flex";
      postImg.onload = () => URL.revokeObjectURL(imageUrl);
    } else {
      resetImage();
      showNotification("Error", "Invalid image file!", "alert-warning");
    }
  };

  /**
   * Reset image preview and file input.
   */
  const resetImage = () => {
    postImg.src = placeholderImg;
    addImg.value = "";
    removeImgButton.style.display = "none";
  };

  /**
   * Handle form submission using fetch API.
   * @param {Event} event - Form submission event.
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const editor = tinymce.get("description");
    if (!editor) {
      showNotification("Error", "Editor is not initialized properly!", "alert-danger");
      return;
    }

    const formData = new FormData(postForm);
    formData.set("description", editor.getContent());

    submitButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");

    try {
      const response = await fetch("backend/add_post.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      if (result === "808080") {
        showNotification("Success", "Post added successfully!", "alert-success", "home");
        postForm.reset();
        resetImage();
        editor.setContent("");
      } else {
        showNotification("Error", result, "alert-danger");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      showNotification("Error", "Something went wrong! Please try again.", "alert-danger");
    } finally {
      submitButton.innerHTML = "Submit";
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }
  };

  // Event Listeners
  addImg.addEventListener("change", showImagePreview);
  removeImgButton.addEventListener("click", resetImage);
  postForm.addEventListener("submit", handleFormSubmit);
});

