document.addEventListener('click',function(e){const t=e.target.closest('.share-btn');if(t){const o=encodeURIComponent(t.id),n=`/backend/view_post.php?post_id=${o}`,a="Check out this amazing post!";if(navigator.share){navigator.share({title:a,text:"Click to view the post",url:n}).then(()=>console.log('Post shared successfully!')).catch(e=>console.error('Error sharing post:',e))}else openShareModal(n,a)}});function openShareModal(e,t){const o=`<div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-md"><div class="modal-content shadow-lg border-0 rounded-3"><div class="modal-header bg-success text-white rounded-top"><h5 class="modal-title mx-auto" id="shareModalLabel"><i class="fas fa-share-alt"></i> Share This Post</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p class="text-center fw-bold text-secondary mb-4">Choose a platform to share:</p><div class="d-flex flex-wrap justify-content-center gap-4"><a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(e)}" target="_blank" class="share-item facebook"><i class="fab fa-facebook-f"></i></a><a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(e)}&text=${encodeURIComponent(t)}" target="_blank" class="ml-3 share-item twitter"><i class="fab fa-twitter"></i></a><a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(e)}&title=${encodeURIComponent(t)}" target="_blank" class="ml-3 share-item linkedin"><i class="fab fa-linkedin-in"></i></a><a href="https://api.whatsapp.com/send?text=${encodeURIComponent(t+' '+e)}" target="_blank" class="ml-3 share-item whatsapp"><i class="fab fa-whatsapp"></i></a></div></div><div class="modal-footer justify-content-center bg-light rounded-bottom"><button type="button" class="btn btn-outline-dark px-4 py-2" data-bs-dismiss="modal">Close</button></div></div></div></div>`;document.body.insertAdjacentHTML('beforeend',o);const n=document.getElementById('shareModal'),a=new bootstrap.Modal(n,{backdrop:!0,keyboard:!0});a.show(),n.addEventListener('hidden.bs.modal',function(){n.remove()})}