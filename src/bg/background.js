(function () {
  'use strict';

  chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.paywall) {
        chrome.pageAction.show(sender.tab.id);
        speak();
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
