// Handle Profile Update Form submission
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let button = this.querySelector('#submit');
    let spinner = button.querySelector('i');
    spinner.classList.remove('d-none');
    button.disabled = true;

    let formData = new FormData(this);

    fetch('../backend/update_profile.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(response => {
        if (response === "808080") {
            showNotification("Success", "Profile updated successfully", "alert-success", "back");
        } else {
            showNotification("Error", response, "alert-danger", "");
        }
    })
    .catch(error => {
        console.error('An error occurred during fetch operation:', error);
        showNotification("Error", "An error occurred while updating profile", "alert-danger", "");
    })
    .finally(() => {
        spinner.classList.add('d-none');
        button.disabled = false;
    });
});

// Handle Slug Input Keyup Event
document.getElementById('slugInput').addEventListener('keyup', function () {
    const slug = this.value.trim();
    const feedback = document.getElementById('slugFeedback');
    const saveButton = document.getElementById('saveSlugButton');

    if (slug.length === 0) {
        feedback.classList.add('d-none');
        saveButton.disabled = true;
        return;
    }

    fetch('../backend/check_slug.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Response:', data);
        if (data.exists) {
            feedback.classList.remove('d-none');
            saveButton.disabled = true;
        } else {
            feedback.classList.add('d-none');
            saveButton.disabled = false;
        }
    })
    .catch((error) => console.error('Error:', error));
});

// Handle Save Slug Button Click
document.getElementById('saveSlugButton').addEventListener('click', function () {
    const slug = document.getElementById('slugInput').value.trim();

    if (slug.length === 0) {
        showNotification("Error", "Please enter a slug!", "alert-danger", "");
        return;
    }

    // Log the slug to confirm input
    console.log('Slug to be saved:', slug);

    fetch('../backend/save_slug.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug })
    })
    .then((response) => {
        console.log('Response received:', response);
        return response.json();
    })
    .then((data) => {
        console.log('Data received:', data);
        if (data.success) {
            showNotification("Success", "Slug saved successfully!", "alert-success", "back");
        } else {
            showNotification("Error", "Failed to save slug. Please try again", "alert-danger", "");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        showNotification("Error", "An error occurred while saving the slug.", "alert-danger", "");
    });
});

