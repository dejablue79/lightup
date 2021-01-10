$( document ).ready(function() {
    $.ajax({
        type: "POST",
        url: "/check",
        success: function(data) {
            for (let item in data) {
                if (data[item] === 0) {
                    $(`#${item}`).attr("src","static/images/lampon.png");
                    $(`#pin_${item}`)..attr({ onclick:`set_status(${ item }, 'off')`, value: "Turn off" });
                } else {
                    $(`#${item}`).attr("src","static/images/lampoff.png");
                    $(`#pin_${item}`).attr({ onclick:`set_status(${ item }, 'on')`, value: "Turn on" });
                }
            }
        }
    });
    function set_status(pin, status) {
        $.ajax({
            type: "POST",
            url: "/light",
            data: {"pin": pin, "status": status},
            success: function(data) {
                if (data["status"] === "on") {
                    $(`#${data["pin"]}`).attr("src","static/images/lampon.png");
                    $("#pin_" + data["pin"]).attr({ onclick:`set_status(${ data["pin"] }, 'off')`, value: "Turn off" });
                } else {
                    $(`#${data["pin"]}`).attr("src","static/images/lampoff.png");
                    $(`#pin_${data["pin"]}`).attr({ onclick:`set_status(${ data["pin"] }, 'on')`, value: "Turn on" });
                }
                console.log("pin " + pin + " was set to: " + status);
            }
        });
    }
});
