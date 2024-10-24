// Confirm Scripts Running
console.log("modalScripts.js is running...")

document.addEventListener("DOMContentLoaded", function() {

    let cookiesAcceptBtn = document.getElementById("cookiesAccept");
    cookiesAcceptBtn.addEventListener("click", function(e) {
        allowDataStorage();
        cookiesModal.hide();
    })

    let cookiesRejectBtn = document.getElementById("cookiesReject");
    cookiesRejectBtn.addEventListener("click", function(e) {
        denyDataStorage();
    })

})

const cookiesModal = new bootstrap.Modal(document.getElementById("cookiesModal"));

/**Checks whether logData has been accepted on loading the window.*/
if (localStorage.logData === "false") {
    cookiesModal.show();
}

/**Function that accepts data storage */
const allowDataStorage = () => localStorage.logData = "true";

/**Function that denies data storage */
const denyDataStorage = () => localStorage.logData = "false";