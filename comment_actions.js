function handleAjaxError(xhr) {
    showNotification("warning", xhr.responseText, "alert-warning");
}
function commentLike(id, post_id) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../backend/like_comment.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            const likeButton = document.querySelector(`#comment_${id}`);
            const action = responseData.action === 'like' ? 'Liked' : 'Like';
            const style = responseData.action === 'like' ? 'active' : '';
            const count = responseData.count;
            
            likeButton.innerHTML = `<span class="${style}"><i class="fas fa-thumbs-up"></i> ${action} (${count})</span>`;
        } else {
            handleAjaxError(xhr);
        }
    };
    xhr.send(`comment_id=${id}&post_id=${post_id}`);
}
function notification() {
    showNotification('warning', 'You aren’t logged in', 'alert-warning');
}
function CNotification(id) {
    showConfirmNotification(
        'Alert', 
        'Are you sure you want to delete this comment?', 
        'alert-warning', 
        function () {
            deleteComment(id);
        }
    );
}
function ConfirmdeleteReply(id) {
    showConfirmNotification(
        'Alert', 
        'Are you sure you want to delete this comment?', 
        'alert-warning', 
        function () {
            deleteReply(id);
        }
    );
}
function toggleReplies(comment_id) {
    const repliesContainer = document.getElementById(`replies-${comment_id}`);
    
    if (repliesContainer.style.display === "none" || repliesContainer.style.display === "") {
        fetch("../backend/view_replies.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `comment_id=${comment_id}`
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.text();
        })
        .then(data => {
            repliesContainer.innerHTML = data;
            repliesContainer.style.display = "block";
        })
        .catch(error => {
            showNotification("warning", error.message, "alert-warning");
        });
    } else {
        repliesContainer.style.display = "none";
    }
}
function toggleReplyForm(comment_id) {
  const editForm = document.querySelector(`#edit-form-${comment_id}`);
  
  editForm.style.display = 'none';
    const replyForm = document.querySelector(`#reply-form-${comment_id}`);
    
    if (document.querySelectorAll('.reply-form').forEach(item => item.style.display === 'block')) {
        document.querySelectorAll('.reply-form').forEach(item => item.style.display = 'none');
    }
    
    replyForm.style.display = (replyForm.style.display === 'none' || replyForm.style.display === '') ? 'block' : 'none';
}
function toggleCommentEditForm(comment_id) {
  const replyForm = document.querySelector(`#reply-form-${comment_id}`);
  replyForm.style.display ='none';
    const editForm = document.querySelector(`#edit-form-${comment_id}`);
    
    if (document.querySelectorAll('.edit-form').forEach(item => item.style.display === 'block')) {
        document.querySelectorAll('.edit-form').forEach(item => item.style.display = 'none');
    }
    
    editForm.style.display = (editForm.style.display === 'none' || editForm.style.display === '') ? 'block' : 'none';
}

function addReply(comment_id, post_id) {
    const replyText = document.querySelector(`#reply-text-${comment_id}`).value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../backend/add_reply.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        const responseData = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && responseData.status === 'success') {
            document.querySelector(`#replies-${comment_id}`).innerHTML += responseData.reply_html;
            document.querySelector(`#reply-text-${comment_id}`).value = '';
            toggleReplies(comment_id);
            toggleReplyForm(comment_id);
            showNotification('success', 'Reply added successfully.', 'alert-success');
        } else {
            showNotification('error', 'Failed to add reply.', 'alert-danger');
        }
    };
    xhr.send(`comment_id=${comment_id}&post_id=${post_id}&reply_text=${replyText}`);
}

function saveEdit(comment_id) {
    const editText = document.querySelector(`#edit-text-${comment_id}`).value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../backend/edit_comment.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        const responseData = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && responseData.status === 'success') {
            document.querySelector(`#comment-text-${comment_id}`).textContent = editText;
            toggleCommentEditForm(comment_id);
            showNotification('success', 'Comment updated successfully.', 'alert-success');
        } else {
            showNotification('error', 'Failed to update comment.', 'alert-danger');
        }
    };
    xhr.send(`comment_id=${comment_id}&comment_text=${editText}`);
}
function deleteComment(comment_id){
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../backend/delete_comment.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            const responseData = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && responseData.status === 'success') {
                document.querySelector(`#comment-${comment_id}`).remove();
                showNotification('success', 'Comment deleted successfully.', 'alert-success');
            } else {
                showNotification('error', 'Failed to delete comment.', 'alert-danger');
            }
        };
        xhr.send(`comment_id=${comment_id}`);
    }

document.addEventListener("DOMContentLoaded", function () {
    const commentForms = document.querySelectorAll(".comment-form");
    commentForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const post_id = form.dataset.postId;
            const comment_text = form.querySelector("textarea[name='comment_text']").value;

            const xhr = new XMLHttpRequest();
            xhr.open('POST', '../backend/add_comment.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                const data = JSON.parse(xhr.responseText);
                if (xhr.status === 200 && data.status === 'success') {
                    document.querySelector("#comments").insertAdjacentHTML('afterbegin', data.comment_html);
                    form.querySelector("textarea[name='comment_text']").value = '';
                }
                showNotification(data.status, data.message, data.alert_class);
            };
            xhr.send(`post_id=${post_id}&comment_text=${comment_text}`);
        });
    });
});
function toggleReplyEditForm(reply_id) {
    const replyTextElement = document.querySelector(`#reply-text-${reply_id}`);
    const currentText = replyTextElement.textContent.trim();
    const editFormHtml = `
    <div class="edit-reply-container p-3 bg-dark text-white rounded">
        <textarea id="edit-reply-text-${reply_id}" class="form-control" rows="2">
            ${currentText}
        </textarea>
        <div class="d-flex justify-content-between gap-2">
            <button class="btn btn-success w-100" onclick="saveReplyEdit(${reply_id})">
                Save
            </button>
            <button class="btn btn-secondary w-100" onclick="cancelEdit(${reply_id}, '${currentText}')">
                Cancel
            </button>
        </div>
    </div>
`;
    replyTextElement.innerHTML = editFormHtml;
}
function saveReplyEdit(reply_id) {
    const newText = document.querySelector(`#edit-reply-text-${reply_id}`).value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../backend/edit_reply.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && data.success) {
            document.querySelector(`#reply-text-${reply_id}`).textContent = newText;
            showNotification('success', 'Reply updated successfully.', 'alert-success');
        } else {
            showNotification('error', 'Error updating reply.', 'alert-danger');
        }
    };
    xhr.send(`reply_id=${reply_id}&reply_text=${newText}`);
}
function cancelEdit(reply_id, originalText) {
    document.querySelector(`#reply-text-${reply_id}`).textContent = originalText;
}
function deleteReply(reply_id) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../backend/delete_reply.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            const data = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && data.success) {
                document.querySelector(`#reply-${reply_id}`).remove();
                showNotification('success', 'Reply deleted successfully.', 'alert-success');
            } else {
                showNotification('error', data.message, 'alert-danger');
            }
        };
        xhr.send(`reply_id=${reply_id}`);
    }
