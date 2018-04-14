(function () {
  'use strict';

	chrome.extension.sendMessage({}, function (response) {
		var readyStateCheckInterval = setInterval(function () {
			if (document.readyState === "complete") {
				clearInterval(readyStateCheckInterval);

				const dnPaywalls = document.getElementsByClassName('paywall__container');
				const svdAdblock = document.getElementById('ad-blocker-dialog-popup');
				if (dnPaywalls && dnPaywalls.length || svdAdblock) {
					chrome.runtime.sendMessage({paywall: true});
				}
			}
		}, 10);
	});

})();
