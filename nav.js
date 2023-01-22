function toggleSideBar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleSideBaropen() {
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleSideBarclose() {
    if (document.getElementById('sidebar').classList.contains("active")) {
        document.getElementById('sidebar').classList.remove("active");
    }
}

function opentable() {
    toggleSideBarclose()
    window.open("table.html", "_self");
}

function openhome() {
    toggleSideBarclose()
    window.open("index.html", "_self");
}


function openmap() {
    toggleSideBarclose()
    window.open("map.html", "_self");
}