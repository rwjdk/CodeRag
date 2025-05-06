window.scrollToElementWhenReady = (id, retries = 10, delay = 100) => {
    let attempt = 0;
    const tryScroll = () => {
        const el = document.getElementById(id);
if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempt < retries) {
    attempt++;
setTimeout(tryScroll, delay);
        }
    };
tryScroll();
};
