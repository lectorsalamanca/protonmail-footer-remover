(function () {
  "use strict";

  const FOOTER_SELECTOR = ".protonmail_signature_block-proton";
  const SCAN_DEBOUNCE_MS = 300;

  let enabled = true;
  let debounceTimer = null;

  chrome.storage.sync.get({ enabled: true }, (result) => {
    enabled = result.enabled;
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
      enabled = changes.enabled.newValue;
    }
  });

  function removeFooters() {
    if (!enabled) return;

    document.querySelectorAll(FOOTER_SELECTOR).forEach((el) => el.remove());

    document.querySelectorAll("iframe").forEach((iframe) => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        doc.querySelectorAll(FOOTER_SELECTOR).forEach((el) => el.remove());
      } catch (e) {}
    });
  }

  function debouncedScan() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(removeFooters, SCAN_DEBOUNCE_MS);
  }

  const observer = new MutationObserver(debouncedScan);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  debouncedScan();
})();
