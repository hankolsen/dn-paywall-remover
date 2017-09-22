(function () {


  const getBackgroundPage = new Promise((resolve, reject) => {
    chrome.runtime.getBackgroundPage(resolve);
  });


  function init() {

    const speakCheckbox = document.getElementById('speak-checkbox');

    getBackgroundPage.then(background => {

      background.loadSettings().then((settings) => {
        speakCheckbox.checked = settings.speak
      });

      speakCheckbox.addEventListener('click', () => {
        const speak = speakCheckbox.checked;
        background.saveSettings({ speak });
      });

    });

  }


  init();

})();
