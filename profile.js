document.addEventListener('DOMContentLoaded', function () {
    // For profile picture upload
    let oldProfile = document.querySelector("#img-pre") ? document.querySelector("#img-pre").src : null;

    const upImageElement = document.getElementById('upImage');
    if (upImageElement) {
        upImageElement.addEventListener('change', function (ev) {
            const file = ev.target.files[0];
            const newImageSrc = URL.createObjectURL(file);
            document.getElementById('img-pre').src = newImageSrc;

            document.querySelector('.cmr').style.display = 'none';
            document.querySelector('.ok').style.display = 'inline-block';
            upImageElement.style.display = 'none';
            document.querySelector('.action').style.display = 'flex';
        });
    }

    const dismissButton = document.querySelector('.dismiss');
    if (dismissButton) {
        dismissButton.addEventListener('click', function () {
            document.querySelector('.ok').style.display = 'none';
            document.querySelector('.action').style.display = 'none';
            document.querySelector('.cmr').style.display = 'inline-block';
            document.getElementById('img-pre').src = oldProfile;
            document.querySelector('#upImage').style.display = 'block';
        });
    }

    const okButton = document.querySelector('.ok');
    if (okButton) {
        okButton.addEventListener('click', function () {
            this.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
            this.disabled = true;

            const fileInput = document.getElementById('upImage');
            const file = fileInput.files[0];

            const formData = new FormData();
            formData.append('type', 'profile_pic');
            formData.append('file', file);

            fetch("../backend/upload_img.php", {
                method: "POST",
                body: formData,
            })
                .then(response => response.text())
                .then(response => {
                    this.innerHTML = '√';
                    this.disabled = false;

                    if (response == 808080) {
                        showNotification("Success", "Profile added successfully", "alert-success", "");
                        oldProfile = document.querySelector("#img-pre").src;
                    } else {
                        showNotification("Error", response, "alert-danger");
                        document.getElementById('img-pre').src = oldProfile;
                    }

                    document.querySelector('.ok').style.display = 'none';
                    document.querySelector('.action').style.display = 'none';
                    document.querySelector('.cmr').style.display = 'block';
                })
                .catch(error => {
                    showNotification("Error", "Failed to upload profile picture", "alert-danger");
                    document.querySelector('.ok').style.display = 'none';
                    document.querySelector('.action').style.display = 'none';
                    document.querySelector('.cmr').style.display = 'block';
                    document.getElementById('img-pre').src = oldProfile;
                });
        });
    }

    // For cover picture upload
    let oldCover = document.querySelector(".cover_pic") ? document.querySelector(".cover_pic").src : null;

    const coverPicInput = document.getElementById('cover_pic_up');
    if (coverPicInput) {
        coverPicInput.addEventListener('change', function () {
            document.querySelector('.cover_pic').src = URL.createObjectURL(this.files[0]);
            document.querySelector('.camera_icon').style.display = 'none';
            document.querySelector('.ok_icon').style.display = 'inline-block';
            this.style.display = 'none';
            document.querySelector('.cover_dismisse').style.display = 'flex';
        });
    }

    const dismissCoverButton = document.querySelector('.dismisse_btn');
    if (dismissCoverButton) {
        dismissCoverButton.addEventListener('click', function () {
            document.querySelector('.cover_pic').src = oldCover;
            document.querySelector('.camera_icon').style.display = 'inline-block';
            document.querySelector('.cover_dismisse').style.display = 'none';
            document.querySelector('.ok_icon').style.display = 'none';
            document.querySelector('#cover_pic_up').style.display = 'block';
        });
    }

    const okCoverButton = document.querySelector('.ok_icon');
    if (okCoverButton) {
        okCoverButton.addEventListener('click', function () {
            this.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
            this.disabled = true;

            const fileInput = document.getElementById('cover_pic_up');
            const file = fileInput.files[0];

            const formData = new FormData();
            formData.append('type', 'cover_pic');
            formData.append('file', file);

            fetch("../backend/upload_img.php", {
                method: "POST",
                body: formData,
            })
                .then(response => response.text())
                .then(response => {
                    this.innerHTML = '<i class="fa fa-camera"></i>';
                    this.disabled = false;

                    if (response == 808080) {
                        showNotification("Success", "Cover added successfully", "alert-success", "");
                        oldCover = document.querySelector(".cover_pic").src;
                    } else {
                        showNotification("Error", response, "alert-danger");
                        document.querySelector('.cover_pic').src = oldCover;
                    }

                    document.querySelector('.ok_icon').style.display = 'none';
                    document.querySelector('.cover_dismisse').style.display = 'none';
                    document.querySelector('.camera_icon').style.display = 'inline-block';
                })
                .catch(error => {
                    console.error(error);
                    showNotification("Error", "Failed to upload cover picture", "alert-danger");
                    document.querySelector('.ok_icon').style.display = 'none';
                    document.querySelector('.cover_dismisse').style.display = 'none';
                    document.querySelector('.camera_icon').style.display = 'inline-block';
                    document.querySelector('.cover_pic').src = oldCover;
                });
        });
    }
});