document.querySelectorAll('a.email-protected').forEach(function(el) {
    var addr = el.dataset.user + '@' + el.dataset.domain;
    el.href = 'mailto:' + addr;
    el.textContent = addr;
});
