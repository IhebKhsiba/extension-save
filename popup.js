document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveButton').addEventListener('click', saveWindows);
    document.getElementById('restoreButton').addEventListener('click', restoreWindows);
    document.getElementById('exportButton').addEventListener('click', exportTabs);
    document.getElementById('importButton').addEventListener('click', importTabs);
  });
  
  function saveWindows() {
    chrome.tabs.query({}, function(tabs) {
      chrome.storage.local.set({ 'savedTabs': tabs });
      alert('saved successfully!');
    });
  }
  
  function restoreWindows() {
    chrome.storage.local.get('savedTabs', function(data) {
      if (data.savedTabs) {
        data.savedTabs.forEach(function(tab) {
          chrome.tabs.create({ url: tab.url });
        });
      } else {
        alert('Aucune fenêtre enregistrée.');
      }
    });
  }

  function exportTabs() {
    chrome.storage.local.get('savedTabs', function(data) {
      if (data.savedTabs) {
        const tabsJSON = JSON.stringify(data.savedTabs);
        const blob = new Blob([tabsJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'saved_tabs.json';
        a.click();
      } else {
        alert('Aucune fenêtre enregistrée à exporter.');
      }
    });
  }
  
  function importTabs() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
  
    input.onchange = function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function() {
        const tabs = JSON.parse(reader.result);
        chrome.storage.local.set({ 'savedTabs': tabs });
        alert('Onglets importés avec succès.');
      };
      reader.readAsText(file);
    };
  
    input.click();
  }
  