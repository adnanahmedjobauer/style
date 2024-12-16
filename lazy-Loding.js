document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('img[loading="lazy"]');

    // IntersectionObserver options
    const options = {
        root: null, // Viewport as root
        rootMargin: '0', // Load 300px before the image comes into view
        threshold: 0.1, // Trigger at 10% visibility
    };

    // Lazy load function
    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Load the original image

                // Add 'loaded' class after the image is loaded
                img.onload = () => img.classList.add('loaded');

                img.removeAttribute('loading');
                observer.unobserve(img); // Stop observing the loaded image
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, options);

    // Observe all images
    images.forEach(image => observer.observe(image));

    // Support dynamically added content
    const observerConfig = {
        childList: true,
        subtree: true,
    };

    const observerForDynamicContent = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (
                    node.nodeType === 1 &&
                    node.tagName === 'IMG' &&
                    node.getAttribute('loading') === 'lazy'
                ) {
                    observer.observe(node);
                }
            });
        });
    });

    observerForDynamicContent.observe(document.body, observerConfig);
});
