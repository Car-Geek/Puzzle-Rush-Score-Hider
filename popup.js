const checkbox = document.getElementById("toggleSidebar");

function applyToActiveTab(shouldHide) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs?.[0]?.id;
    if (!tabId) return;

    chrome.scripting.executeScript({
      target: { tabId },
      func: (hide) => {
        const el = document.querySelector(".sidebar-play-solved");
        if (el) {
          el.style.display = hide ? "none" : "";
        }
      },
      args: [shouldHide]
    });
  });
}

// Load saved state (default to true) and apply to current tab
chrome.storage.sync.get({ sidebarHidden: true }, ({ sidebarHidden }) => {
  checkbox.checked = sidebarHidden;
  applyToActiveTab(sidebarHidden);
});

// Save and apply on change
checkbox.addEventListener("change", () => {
  const shouldHide = checkbox.checked;
  chrome.storage.sync.set({ sidebarHidden: shouldHide });
  applyToActiveTab(shouldHide);
});
