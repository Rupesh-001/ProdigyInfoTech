document.getElementById("copyEmail").addEventListener("click", function () {
    const email = "varmarupesh101@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        showToast();
    }).catch(err => {
        console.error("Failed to copy email: ", err);
    });
});

function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}