function preloadFunc() {
    if (localStorage.getItem("canaccess") === null) {
        let person = prompt("Please enter Password", "");
        if (person != null) {
            if (person !== 'pass') {
                alert("WRONG PASSWORD");
                window.open("https://www.google.com", "_self");
            } else {
                localStorage.setItem("canaccess", "true");
            }
        }
    }
}
window.onpaint = preloadFunc();