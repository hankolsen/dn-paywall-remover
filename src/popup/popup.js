(function () {

  const SYNC_KEY = 'DN_PAYWALL_REMOVER';

  const speakCheckbox = document.getElementById('speak-checkbox');

  function init() {
    chrome.storage.sync.get(SYNC_KEY, (items) => {
      if (!chrome.runtime.error) {
        const speak = items[SYNC_KEY].speak;
        speakCheckbox.checked = speak;
      }
    })
  }

  speakCheckbox.addEventListener('click', () => {
    const speak = speakCheckbox.checked;
    const data = { speak };
    chrome.storage.sync.set({SYNC_KEY: data}, function() {

    });
  });

  init();

})();
