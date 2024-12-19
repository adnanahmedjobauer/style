// For profile picture upload
let oldProfile = document.querySelector("#img-pre").src;

document.getElementById('upImage').onchange = function (ev) {
    ev = URL.createObjectURL(this.files[0]);
    document.getElementById('img-pre').src = ev;

    document.querySelector('.cmr').style.display = 'none';
    document.querySelector('.ok').style.display = 'inline-block';
    this.style.display = 'none';
    document.querySelector('.action').style.display = 'flex';
};

document.querySelector('.dismiss').onclick = function () {
    document.querySelector('.ok').style.display = 'none';
    document.querySelector('.action').style.display = 'none';
    document.querySelector('.cmr').style.display = 'inline-block';
    document.getElementById('img-pre').src = oldProfile;
    document.querySelector('#upImage').style.display = 'block';
};

document.querySelector('.ok').onclick = function () {
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
};

// For cover picture upload
let oldCover = document.querySelector(".cover_pic").src;

document.getElementById('cover_pic_up').onchange = function () {
    document.querySelector('.cover_pic').src = URL.createObjectURL(this.files[0]);
    document.querySelector('.camera_icon').style.display = 'none';
    document.querySelector('.ok_icon').style.display = 'inline-block';
    this.style.display = 'none';
    document.querySelector('.cover_dismisse').style.display = 'flex';
};

document.querySelector('.dismisse_btn').onclick = function () {
    document.querySelector('.cover_pic').src = oldCover;
    document.querySelector('.camera_icon').style.display = 'inline-block';
    document.querySelector('.cover_dismisse').style.display = 'none';
    document.querySelector('.ok_icon').style.display = 'none';
    document.querySelector('#cover_pic_up').style.display = 'block';
};

document.querySelector('.ok_icon').onclick = function () {
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
};

function redirectSocialLink(link) {
    window.location.href = link;
}

function callPhoneNumber(phoneNumber) {
    window.location.href = 'tel:' + phoneNumber;
}