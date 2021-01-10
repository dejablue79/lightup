function set_status(pin, status) {
    $.ajax({
        type: "POST",
        url: "/light",
        data: {"pin": pin, "status": status},
        success: function(data) {
            if (data["status"] == "on") {
                $(data[pin]).attr("src","static/images/lampon.png");
            } else {
                $(data[pin]).attr("src","static/images/lampoff.png");
            }
            console.log("pin " + data[pin] + " was set to: " + status);
        }
    });
}