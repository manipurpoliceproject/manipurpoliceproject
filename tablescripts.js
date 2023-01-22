import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

$(".dt-button").addClass("btn btn-light mx-sm-1 mb-2 rounded-extra shadow-custom");

const dbRef = ref(database);

get(child(dbRef, `User`)).then((snapshot) => {
    if (snapshot.exists()) {
        var vehicles = []
        Object.keys(snapshot.val()).forEach(element => {
            vehicles.push(snapshot.val()[element])
        });
        console.log(vehicles)
        $(document).ready(function () {
            var oTblReport = $("#myTable")

            oTblReport.DataTable({
                dom: '<"top"<"left-col"B><"right-col"f>>rtip',
                buttons: [
                    { extend: 'copy', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
                    { extend: 'csv', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
                    { extend: 'excel', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
                    { extend: 'pdf', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
                    { extend: 'print', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' }
                ],
                "data": vehicles,
                "columns": [
                    { data: "carNumber" },
                    { data: "policeInChargeName" },
                    { data: "phoneNumber" },
                    { data: "highwayNumber" },
                    { data: "sectorNumber" },
                    { data: "zoneNumber" },
                    { data: "time" },
                    { data: "lat" },
                    { data: "lng" },
                ],
                columnDefs: [{
                    targets: 6,
                    render: function (data) {
                        return moment(data).format('Do MMM YYYY h:mm:ss a');
                    }
                }, {
                    targets: 0,
                    render: function (data) {
                        return '<a href="history.html?vehicle=' + data + ' ">' + data.toUpperCase() + '</a>';
                        // return '<a href="history.html?vehicle=' + data + ' >' + data.toUpperCase() + ' </a > ';
                    }
                }]
            });
        });

    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
