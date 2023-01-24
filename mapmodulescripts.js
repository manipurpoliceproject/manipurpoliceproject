// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBtWe_gGK4nt314LUOObmawAjgqN0kA1nU",
    authDomain: "manipur-police-project.firebaseapp.com",
    databaseURL: "https://manipur-police-project-default-rtdb.firebaseio.com",
    projectId: "manipur-police-project",
    storageBucket: "manipur-police-project.appspot.com",
    messagingSenderId: "82906907707",
    appId: "1:82906907707:web:6af6363b6afb0e904b481e",
    measurementId: "G-5ZHX0JZMVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let mapOptions = {
    zoomControl: false,
    zoomSnap: 0.5,
    maxZoom: 15
}

const svgIcon = L.divIcon({
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="0" fill="none" stroke="#f71010" stroke-width="20">
  <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" values="0;30" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="1.282051282051282s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
</circle><circle cx="50" cy="50" r="0" fill="none" stroke="#1b00ff" stroke-width="20">
  <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" values="0;30" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.641025641025641s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="1.282051282051282s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.641025641025641s"></animate>
</circle>
<!-- [ldio] generated by https://loading.io/ --></svg>`,
    className: "",
    iconSize: [24, 40],
    popupAnchor: [0, -10],
    // iconAnchor: [12, 40],
});

let map = new L.map('map', mapOptions)
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

let layer = new L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
map.addLayer(layer)

// var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
//     subdomains: 'abcd',
//     maxZoom: 19
// });
// CartoDB_DarkMatter.addTo(map);

// // Google Map Layer

// var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
//     maxZoom: 20,
//     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
// });
// googleStreets.addTo(map);

// // Satelite Layer
// var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
//     maxZoom: 20,
//     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
// });
// googleSat.addTo(map);

// var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
//     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     subdomains: 'abcd',
//     minZoom: 1,
//     maxZoom: 16,
//     ext: 'jpg'
// });
// Stamen_Watercolor.addTo(map);


$("body").on('click', '.bright', function () {
    // alert('hello');
    var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    googleStreets.addTo(map);
});

$("body").on('click', '.dark', function () {
    let layer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });
    map.addLayer(layer)
});

const db = getDatabase();
var vehicles = [];
const usersLocation = ref(db, 'User');
onValue(usersLocation, (snapshot) => {
    const data = snapshot.val();
    vehicles = [];
    document.getElementById("searchlist").innerHTML = '';
    Object.keys(data).forEach(element => {
        vehicles.push(data[element])
    });
    updateLocation();
    console.log(vehicles);
});

var markersonchart = []
var cities = L.layerGroup(markersonchart);
var showall = true
$('#sidepanelhighway1').click(function () { showonly('nh-102'); });
$('#sidepanelhighway2').click(function () { showonly('nh-2'); });
$('#sidepanelhighway3').click(function () { showonly('nh-37'); });

$('#ShowAll').click(function () { showall = true; updateLocation(); });

function showonly(para) {
    showall = false
    var latlon = []
    markersonchart.forEach(element => {
        map.removeLayer(element)
    });
    vehicles.forEach(element => {
        if (Object.values(element).join(' ').toLowerCase().includes(para.toLowerCase())) {
            console.log(element["lat"], element["lng"])
            latlon.push([element["lat"], element["lng"]])
            var marker = L.marker([element["lat"], element["lng"]], { icon: svgIcon }).addTo(map).
                bindPopup("<b>Vehicle Number : </b>" + element["carNumber"].toUpperCase() + '<br>' + "<b>Highway Number : </b>" + element["highwayNumber"] + '<br>' + "<b>Phone  : </b>" + element["phoneNumber"] + '<br>' + "<b>Police Incharge Name : </b>" + element["policeInChargeName"] + '<br>' + "<b>Sector Number : </b>" + element["sectorNumber"] + '<br>' + "<b>Time : </b>" + moment(element["time"]).format('Do MMM YYYY h:mm:ss a') + '<br>' + "<b>Zone : </b>" + element["zoneNumber"] + '<br> <a href="history.html?vehicle=' + element["carNumber"] + '">View History</a>')
                .openPopup();
            markersonchart.push(marker);
        }

    });
    var bounds = new L.LatLngBounds(latlon).extend();
    map.fitBounds(bounds);
}

function updateLocation() {
    if (showall == true) {
        var latlon = []
        markersonchart.forEach(element => {
            map.removeLayer(element)
        });

        vehicles.forEach(element => {
            console.log(element["lat"], element["lng"])
            latlon.push([element["lat"], element["lng"]])
            var marker = L.marker([element["lat"], element["lng"]], { icon: svgIcon }).addTo(map).
                bindPopup("<b>Vehicle Number : </b>" + element["carNumber"].toUpperCase() + '<br>' + "<b>Highway Number : </b>" + element["highwayNumber"] + '<br>' + "<b>Phone  : </b>" + element["phoneNumber"] + '<br>' + "<b>Police Incharge Name : </b>" + element["policeInChargeName"] + '<br>' + "<b>Sector Number : </b>" + element["sectorNumber"] + '<br>' + "<b>Time : </b>" + moment(element["time"]).format('Do MMM YYYY h:mm:ss a') + '<br>' + "<b>Zone : </b>" + element["zoneNumber"] + '<br> <a href="history.html?vehicle=' + element["carNumber"] + '">View History</a>')
                .openPopup();
            markersonchart.push(marker);

        });
        var bounds = new L.LatLngBounds(latlon).extend();
        map.fitBounds(bounds);
    }

}


$("body").on("focus", "#searchinput", function () {
    $('.searchlist').removeClass("d-none");
    console.log($('#searchinput').val().length)
    if ($('#searchinput').val().length > 0) {
        console.log($('#searchinput').val())
        addtosearchlist($('#searchinput').val())
    } else {
        $('.searchlist').removeClass("d-none");
        vehicles.forEach(element => {
            if ($('#' + element["carNumber"].toUpperCase())[0]) {
                document.getElementById.innerHTML = "<b>Vehicle Number : </b>" + element["carNumber"].toUpperCase() + '<br>' + "<b>Highway Number : </b>" + element["highwayNumber"] + '<br>' + "<b>Phone  : </b>" + element["phoneNumber"] + '<br>' + "<b>Police Incharge Name : </b>" + element["policeInChargeName"] + '<br>' + "<b>Sector Number : </b>" + element["sectorNumber"] + '<br>' + "<b>Zone : </b>" + element["zoneNumber"] + '<hr> '
            } else {
                var div = document.createElement('div');
                div.innerHTML = "<b>Vehicle Number : </b>" + element["carNumber"].toUpperCase() + '<br>' + "<b>Highway Number : </b>" + element["highwayNumber"] + '<br>' + "<b>Phone  : </b>" + element["phoneNumber"] + '<br>' + "<b>Police Incharge Name : </b>" + element["policeInChargeName"] + '<br>' + "<b>Sector Number : </b>" + element["sectorNumber"] + '<br>' + "<b>Zone : </b>" + element["zoneNumber"] + '<hr> '
                div.setAttribute("id", element["carNumber"].toUpperCase());
                div.setAttribute("class", "pointerclass");
                document.getElementById("searchlist").appendChild(div);
            }
        });
    }
});

var focusflag = false;

$('.searchlist').click(function () { focusflag = true; });
// $('div.stop').click(function () { $('div.box').stop(); });
$("#searchinput").focusout(function () {
    setTimeout(
        function () {
            if (!focusflag)
                $('.searchlist').addClass("d-none");
        },
        200);

});

$(".searchlist").on("click", "div", function (event) {
    focusflag = true;
    showonly($(this).attr('id').toLowerCase())
    $('.searchlist').addClass("d-none");
});

$(".pointerclass").click(function () {
    alert("You clicked on li " + $(this).text());
});

$("#searchinput").keyup(function () {
    addtosearchlist($('#searchinput').val())
    // console.log();
});

function addtosearchlist(para) {
    focusflag = false;
    $('.searchlist').removeClass("d-none");
    // console.log('fuc called')
    document.getElementById("searchlist").innerHTML = '';
    vehicles.forEach(element => {

        if (Object.values(element).join(' ').toLowerCase().includes(para.toLowerCase())) {
            // console.log(Object.values(element).join(' ').toLowerCase())
            var div = document.createElement('div');
            div.innerHTML = "<b>Vehicle Number : </b>" + element["carNumber"].toUpperCase() + '<br>' + "<b>Highway Number : </b>" + element["highwayNumber"] + '<br>' + "<b>Phone  : </b>" + element["phoneNumber"] + '<br>' + "<b>Police Incharge Name : </b>" + element["policeInChargeName"] + '<br>' + "<b>Sector Number : </b>" + element["sectorNumber"] + '<br>' + "<b>Zone : </b>" + element["zoneNumber"] + '<hr> '
            div.setAttribute("id", element["carNumber"].toUpperCase());
            div.setAttribute("class", "pointerclass");
            document.getElementById("searchlist").appendChild(div);

        }
    });
}

