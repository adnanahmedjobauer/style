      
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