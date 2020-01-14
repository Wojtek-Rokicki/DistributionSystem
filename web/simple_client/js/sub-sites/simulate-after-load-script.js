/******************** Communication with server ********************/

// Querying server for simulation snapshot data
//var server_querying = setInterval(querying, 5000);

function querying(){
    var json_snapshot_request = jsonSnapshotRequest();
    /*var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            mapUpdate(this.responseText);
            document.getElementById("myRange").value = Number(value) + 1;
        }
    };

    xhttp.open("POST", "snapshot_request.php", true);
    var headerName = "Content-type";
    var headerValue = "application/x-www-snapshot-request";
    var sendString = json_snapshot_request;
    xhttp.setRequestHeader(headerName, headerValue);
    xhttp.send(sendString);*/
}

function jsonSnapshotRequest(){
    var jsonData = "{\"snapshotNumber\": ";
    jsonData += document.getElementById("myRange").value;
    jsonData += "}";
    alert(jsonData);
    return jsonData;
}

function mapUpdate(jsonData){
    jsonData = JSON.parse(jsonData);
    //TODO: updating map
}

function sliderChanged(){
    var snapshot_number = document.getElementById("myRange").value;
    document.getElementById("output").innerHTML = snapshot_number;
    /*var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            mapUpdate(this.responseText);
        }
    };

    xhttp.open("POST", "snapshot_request.php", true);
    var headerName = "Content-type";
    var headerValue = "application/x-www-snapshot-request";
    var sendString = json_snapshot_request;
    xhttp.setRequestHeader(headerName, headerValue);
    xhttp.send(sendString);*/
}

function stopSimulation(){
    clearInterval(server_querying);
}

function resumeSimulation(){
    server_querying = setInterval(querying, 5000);
}

// Request with Response communication and service
//Example of use in HTML
//<button type="button" onclick="loadDoc('ajax_info.txt', myFunction)">Change Content</button>
/*
function loadDoc(url, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    };

    xhttp.open("POST", url, true);
    var headerName = "Content-type";
    var headerValue = "application/x-www-form-urlencoded";
    var sendString = "fname=Henry&lname=Ford";
    xhttp.setRequestHeader(headerName, headerValue);
    xhttp.send(sendString);
}

function myFunction1(xhttp) {
    var textFromServer = xhttp.responseText;
    var data = JSON.parse(textFromServer);
}
*/

/************************** GOOGLE MAPS API **************************/ 
var position = [52.22977, 21.01178];

function initialize() {
    var latlng = new google.maps.LatLng(position[0], position[1]);
    var myOptions = {
        zoom: 7,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);

    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Latitude:" + position[0] + " | Longitude:" + position[1]
    });

    google.maps.event.addListener(map, 'click', function (event) {
        var result = [event.latLng.lat(), event.latLng.lng()];
        transition(result);
    });
}

//Load google map
google.maps.event.addDomListener(window, 'load', initialize);


var numDeltas = 100;
var delay = 10; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;

function transition(result) {
    i = 0;
    deltaLat = (result[0] - position[0]) / numDeltas;
    deltaLng = (result[1] - position[1]) / numDeltas;
    moveMarker();
}

function moveMarker() {
    position[0] += deltaLat;
    position[1] += deltaLng;
    var latlng = new google.maps.LatLng(position[0], position[1]);
    marker.setTitle("Latitude:" + position[0] + " | Longitude:" + position[1]);
    marker.setPosition(latlng);
    if (i != numDeltas) {
        i++;
        setTimeout(moveMarker, delay);
    }
}