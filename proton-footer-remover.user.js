// ==UserScript==
// @name         Proton Mail Footer Remover
// @namespace    https://github.com/efeatasayar/proton-footer-remover
// @version      1.0.0
// @description  Automatically removes the promotional footer from Proton Mail's free tier compose window.
// @author       efeatasayar
// @match        https://mail.proton.me/*
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  const FOOTER_SELECTOR = ".protonmail_signature_block-proton";
  const SCAN_DEBOUNCE_MS = 300;

  let enabled = GM_getValue("enabled", true);
  let debounceTimer = null;

  GM_registerMenuCommand(
    enabled ? "Disable Footer Remover" : "Enable Footer Remover",
    () => {
      enabled = !enabled;
      GM_setValue("enabled", enabled);
      location.reload();
    }
  );

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
