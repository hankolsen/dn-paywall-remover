(function () {
  'use strict';

  const SETTINGS_KEY = 'DN_PAYWALL_REMOVER';
  let doSpeak = true;

  window.loadSettings = function () {
    return new Promise(resolve => {
      chrome.storage.sync.get(SETTINGS_KEY, result => {
        const defaultSettings = {
          speak: true
        };
        const savedSettings = {...defaultSettings, ...result[SETTINGS_KEY]};
        resolve(savedSettings);
      })
    })
  };

  window.saveSettings = function (settings) {
    const storage = {
      [SETTINGS_KEY]: settings
    };
    chrome.storage.sync.set(storage);
    doSpeak = settings.speak;
  };



  chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.paywall) {
        chrome.pageAction.show(sender.tab.id);
        doSpeak && speak();
      }
    }
  );


  function speak(){
    var options = {
      lang: 'sv-SE'
    };

    var utterance = getUtterance();
    chrome.tts.speak(utterance, options);
  }



  function getUtterance() {
    var utterances = [
      'Man är inte snål bara för att man inte betalar.',
      //'Låt oss skippa betalningen idag.'
    ];

    var index = Math.floor((Math.random() * utterances.length));

    return utterances[index];
  }

})();
