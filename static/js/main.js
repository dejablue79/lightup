function set_status(pin, status) {
    $.ajax({
        type: "POST",
        url: "/light",
        data: {"pin": pin, "status": status},
        success: function(pin, status) {
            if (status == "on") {
                $('#', pin).attr("src","static/images/lampon.png");
            } else {
                $('#', pin).attr("src","static/images/lampoff.png");
            }

            console.log("pin " + pin + " was set to: " + status)
        }
    });
}