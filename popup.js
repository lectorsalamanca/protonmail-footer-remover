const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

chrome.storage.sync.get({ enabled: true }, (result) => {
  toggle.checked = result.enabled;
  status.textContent = result.enabled ? "Active" : "Disabled";
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });
  status.textContent = enabled ? "Active" : "Disabled";
});
