let rssToRead = "";

document.body.onload = function()
{
	//on body onload, load rss
	chrome.storage.sync.get("options", function(data)
	{
		//find the rss to read in options value stored
		numRssToRead = data["options"]["selection"];
		address = data["options"][numRssToRead]["rssAddress"];
		
		//send a request to load the RSS link
		let request = new XMLHttpRequest();
		
		//reaction when RSS link was loaded
		request.onreadystatechange = function()
		{	
			if (this.readyState == 4 && this.status == 200)
			{
				//read response
				let xmlDoc = request.responseXML;
				
				//1.find the title of the podcast
				let name = xmlDoc.getElementsByTagName("channel")[0].childNodes[1].innerHTML;
				document.getElementById("name").innerHTML = name;

				//2.go through rss file
				let items = xmlDoc.getElementsByTagName("item");
				let txt = "";
				let txtDate = "";
				
				for (i = 0; i < items.length - 1; i++) //avoid the last one
				{
					if (items[i] != "undefined" &&
						items[i].childNodes[11] != "undefined" &&
						items[i].childNodes[1] != "undefined" &&
						items[i].childNodes[15] != "undefined" &&
						items[i].childNodes[35] != "undefined")
					{
						txtDate = formatDate(items[i].childNodes[15]/*=pubDate*/.childNodes[0].nodeValue);
						txt += txtDate + "<br>" + "[" + items[i].childNodes[35]/*=duration*/.childNodes[0].nodeValue + "]<a href=\"" + items[i].childNodes[11]/*=enclosure*/.attributes["url"].nodeValue + "\" target=\"_blank\">" + items[i].childNodes[1]/*=title*/.childNodes[0].nodeValue + "<\a><br>";
					}
				}

				document.getElementById("loadedPodcasts").innerHTML = txt;
			}
		};
		
		//send the request
		request.open("GET", address, true);
		request.send();
	});
}

let formatDate = function(formatDate)
{
	let splitted = formatDate.split(" ");
	return splitted[1] + " " + splitted[2] + " " + splitted[3];
}