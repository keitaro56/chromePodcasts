let tabNum = [];
let options = {};
let more = document.getElementById("more");

//on startup, load values
chrome.storage.sync.get("options", function(data)
{
	if (Object.keys(data).length != 0)
	{
		options = data["options"];

		for(const [key, value] of Object.entries(options))
		{
			if (key != "selection")
			{
				functionAdd(value["rssName"], value["rssAddress"], key);
				tabNum.push(parseInt(key));
			}
			else
			{
				let radioToSelect = document.getElementById("radio" + value);
				radioToSelect.checked = true;
			}
		}
	}
});

let buttonAdd = document.getElementById("podcastAdd");

buttonAdd.addEventListener("click", function ()
{
	let rssName = document.getElementById("rssName");
	let rssAddress = document.getElementById("rssAddress");
	
	if (rssName.value != "" && rssAddress.value != "")
	{
		let tab = {};
		tab["rssName"] = rssName.value;
		tab["rssAddress"] = rssAddress.value;

		let i = findNumber();
		functionAdd(rssName.value, rssAddress.value, i);

		options[i] = tab;
		chrome.storage.sync.set({options});
	}
});

let functionAdd = function (rssName, rssAddress, numRss)
{
	//create checkbox
	let radio = document.createElement("input");
	radio.type = "radio";
	radio.id = "radio" + numRss;
	radio.name = "selection";
	
	//create text for name
	let name = document.createElement("input");
	name.type = "text";
	name.id = "rssName" + numRss;
	name.value = rssName;
	name.disabled = true;

	//create text for address
	let address = document.createElement("input");
	name.type = "text";
	address.id = "rssAddress" + numRss;
	address.size = 75;
	address.value = rssAddress;

	//create button to delete
	let deleteButton = document.createElement("input");
	deleteButton.type = "button";
	deleteButton.id = "delete" + numRss;
	deleteButton.value = "delete";

	deleteButton.addEventListener("click", function ()
	{
		delete options[numRss];
		tabNum.pop(numRss);
		chrome.storage.sync.set({options});

		more.removeChild(radio);
		more.removeChild(name);
		more.removeChild(address);
		more.removeChild(deleteButton);
	});

	radio.addEventListener("click", function ()
	{
		saveSelection(numRss);
	});

	more.appendChild(radio);
	more.appendChild(name);
	more.appendChild(address);
	more.appendChild(deleteButton);
	more.appendChild(document.createElement("br"));
}

let findNumber = function ()
{
	let lastNumber = tabNum[tabNum.length - 1];

	if (lastNumber == undefined)
	{
		lastNumber = -1;
	}

	for (let i = 0; i < lastNumber; i++)
	{
		if (tabNum.indexOf(i) == -1)
		{
			tabNum.push(i);
			return i;
		}
	}

	tabNum.push(lastNumber + 1);
	return lastNumber + 1;
}

let saveSelection = function(numRss)
{
	options["selection"] = numRss;
	chrome.storage.sync.set({options});
}