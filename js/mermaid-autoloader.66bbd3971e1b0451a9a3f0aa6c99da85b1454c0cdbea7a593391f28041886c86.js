// mermaid-autoloader.js
(function () {
  let debounceTimer = null;
  const renderedSet = new WeakSet();

  function renderMermaid() {
    if (!window.mermaid) return;
    const blocks = document.querySelectorAll('pre.mermaid:not([data-mermaid-done])');
    if (blocks.length === 0) return;

    window.mermaid.run({ querySelector: 'pre.mermaid' });

    blocks.forEach(el => {
      el.dataset.mermaidDone = '1';
    });
  }

  function triggerRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderMermaid, 120);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const target = document.body;
    if (!target) return;

    const observer = new MutationObserver(function () {
      triggerRender();
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });

    triggerRender();
  });
})();