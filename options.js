let rssToRead = document.getElementById("rssToRead");
let options = {};

//on startup, load values
chrome.storage.sync.get("options", function(data)
	{
			rssToRead.value = data["options"]["rssToRead"];
	}
);

rssToRead.addEventListener("change", function (ev)
	{
		options["rssToRead"] = rssToRead.value;
		chrome.storage.sync.set({options});
	}
);
