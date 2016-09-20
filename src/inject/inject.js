(function () {
  'use strict';

	chrome.extension.sendMessage({}, function (response) {
		var readyStateCheckInterval = setInterval(function () {
			if (document.readyState === "complete") {
				clearInterval(readyStateCheckInterval);

				var paywalls = document.getElementsByClassName('paywall__container');
				if (paywalls && paywalls.length) {
					chrome.runtime.sendMessage({paywall: true});
				}
			}
		}, 10);
	});

})();
