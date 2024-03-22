chrome.runtime.onInstalled.addListener(function() {
    chrome.windows.getAll({ populate: true }, function(windows) {
      chrome.storage.local.set({ 'savedWindows': windows });
    });
  });
  
  chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.get('savedWindows', function(data) {
      if (data.savedWindows) {
        data.savedWindows.forEach(function(window) {
          chrome.windows.create({ state: window.state, focused: window.focused, tabs: window.tabs });
        });
      }
    });
  });
  