let rssToRead = "";

document.body.onload = function()
{
	//on body onload, load rss
	chrome.storage.sync.get("options", function(data)
		{
				//find the rss to read in options value stored
				rssToRead = data["options"]["rssToRead"];
				
				//send a request to load the RSS link
				let request = new XMLHttpRequest();
				
				//reaction when RSS link was loaded
				request.onreadystatechange = function()
				{	
					if (this.readyState == 4 && this.status == 200)
					{
						//read response
						let xmlDoc = request.responseXML;
						
						//go through rss file
						let titles = xmlDoc.getElementsByTagName("title");
						let links = xmlDoc.getElementsByTagName("enclosure");
						let txt = "";
						
						for (i = 0; i< Math.min(links.length, titles.length); i++)
						{
							if(links[i] != "undefined" && titles[i] != "undefined")
							{
								txt += "<a href=\"" + links[i].attributes["url"].nodeValue + "\" target=\"_blank\">" + titles[i].childNodes[0].nodeValue + "<\a><br>";
							}
						}
  
						document.getElementById("loadedPodcasts").innerHTML = txt;
					}
				};
				
				//send the request
				request.open("GET", rssToRead, true);
				request.send();
		}
	);
}