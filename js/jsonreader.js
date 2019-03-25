var requestURL = "http://www.erimarlie.no/js/short.json";
var request = new XMLHttpRequest();
request.open('GET', "/js/short.json", requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
    var issuer = request.response;
    fillName(issuer);
}

var getDate = function (dateString) {
        var date = new Date(dateString);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        return day + "." + month + "." + date.getFullYear();
    }

function fillName(jsonObj) {
    const main = document.getElementById('contentrow');
    while(main.firstChild){
        main.removeChild(main.firstChild);
		console.log("removed?");
    }

	/*var html =
            "<tr class='issuerRow' data-isin='" + issuer.isin + "'><td>" + jsonObj[i].Name + "</td>" +
                "<td><a href='/Home/Details/" + issuer.isin + "'>" + issuer.name + "</td>" +
                "<td style='text-align: right'>" + issuer.shortedSum.toLocaleString() + "</td>" +
                "<td style='text-align: right'>" + issuer.shortPercent.toFixed(2) + "%</td>" +
                "<td style='text-align: right'>" + getDate(issuer.lastChange) + "</td></tr>";*/

    for (var i = 0; i < jsonObj.length; i++) {
        var tr = document.createElement('tr');
		tr.setAttribute("scope", "row");
        var td = document.createElement('td');
        td.textContent = jsonObj[i].Name;
        var td2 = document.createElement('td');
        td2.textContent = jsonObj[i].ShortPercent.toFixed(2) + "%";
        var td3 = document.createElement('td');
        td3.textContent = jsonObj[i].ShortedSum.toLocaleString();
        var td4 = document.createElement('td');
        td4.textContent = getDate(jsonObj[i].LastChange);

		if (jsonObj[i].ShortedSum == 0) {
			continue;
		}

		td.setAttribute("scope", "col");
		td2.setAttribute("scope", "col");
		td3.setAttribute("scope", "col");
		td4.setAttribute("scope", "col");
		main.appendChild(tr);
		main.appendChild(td);
		main.appendChild(td2);
		main.appendChild(td3);
		main.appendChild(td4);
    }
}