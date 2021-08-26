//message listener for background
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
{
	if (request.command === 'applyPaywallBan')
	{
		let paywall = document.getElementById("didomi-popup");
		paywall.remove();
		
		let body = document.querySelector("body.didomi-popup-open");
		body.style.setProperty("overflow", "visible", "important");
	}
	
	return true;
});