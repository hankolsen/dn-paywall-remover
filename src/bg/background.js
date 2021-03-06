(function () {
  'use strict';

  const SYNC_KEY = 'DN_PAYWALL_REMOVER';

  let doSpeak = true;

  chrome.storage.sync.get(SYNC_KEY, (items) => {
    if (!chrome.runtime.error) {
      doSpeak = items[SYNC_KEY].speak;
    }
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    const newSettigns = changes[SYNC_KEY];
    if (newSettigns) {
      doSpeak = newSettigns.newValue.speak;
    }
  });

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
