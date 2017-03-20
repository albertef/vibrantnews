var apiurl = "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=60ccb91ad93848fea0b143ef9c80580c";
window.onload = function() {
	newsgenerate();
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
	//alert("Device Ready");
}

function newsgenerate() {
	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            if (xmlhttp.status == 200) {
			    var jsonout = JSON.parse(xmlhttp.responseText);
				var jsonoutput = "";
				for(var i=0;i<jsonout.articles.length;i++){
					jsonoutput += '<div class="col-xs-6" onclick="getfulldetails(' + i + ')" data-item="' + i + '"><img src=' + jsonout.articles[i].urlToImage + '>' +
								 '<h6>' + jsonout.articles[i].title + '</h6>' +
								 '<span>' + jsonout.articles[i].publishedAt + '</span></div>';
								  
					//document.getElementById('encoderesult').innerHTML = "";
				}
				document.getElementById('newsfeed').innerHTML = jsonoutput;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('Please check your internet connectivity');
           }
        }
    };

    xmlhttp.open("GET", apiurl, true);
    xmlhttp.send();
}
function getfulldetails(newsid){
	//alert(newsid);
	document.getElementById('detailview').style.display = "block";
	document.getElementById('detailview').style.animation = "scaleup .3s ease-out";
	document.getElementById('detailview').style.transform = "scale(1.0)"; 
	document.getElementById('detailview').innerHTML = ('<div class="loadingimage"><img src="img/squares.gif"></div>');
	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            if (xmlhttp.status == 200) {
			    var jsonout = JSON.parse(xmlhttp.responseText);
				var jsonoutput = '<i class="fa fa-arrow-circle-left" aria-hidden="true" onclick="detailclose();"></i><img src=' + jsonout.articles[newsid].urlToImage + '>' +
								 '<div class="sidemargin"><div><div class="col-xs-6"><h6 class="text-primary">By ' + jsonout.articles[newsid].author + '</h6></div>' +
								 '<div class="col-xs-6"><h6 class="text-right">On ' + jsonout.articles[newsid].publishedAt + '</h6></div></div>' +
								 '<h4>' + jsonout.articles[newsid].title + '</h4>' +
								 '<p class="maincontent">' + jsonout.articles[newsid].description + '</p>' +
								 '<p class="text-right margin-20"><a class="btn" href="' + jsonout.articles[newsid].url + '"><i class="fa fa-link" aria-hidden="true"></i> Go to news link</a></p></div>';
				document.getElementById('detailview').innerHTML = jsonoutput;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('Please check your internet connectivity');
           }
        }
    };

    xmlhttp.open("GET", apiurl, true);
    xmlhttp.send();
}
function detailclose() {
	document.getElementById('detailview').style.animation = "scaledown .3s ease-out";
	document.getElementById('detailview').style.transform = "scale(0.0)"; 
	document.getElementById('detailview').innerHTML = ('<div class="loadingimage"><img src="img/squares.gif"></div>');
}