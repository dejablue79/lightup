function set_status(pin, status) {
    $.ajax({
        type: "POST",
        url: "/light",
        data: {"pin": pin, "status": status},
        success: console.log("pin " + pin + " was set to: " + status)
    });
}