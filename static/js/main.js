$( document ).ready(function() {
    send_post("check");
    setTimeout(check_server,5000);
});

function set_status(pin, status) {
    send_post("/light", pin, status);
}

function send_post(url, pin="", status="") {
    $.ajax({
        type: "POST",
        url: `/${url}`,
        data: {"pin": pin, "status": status},
        success: function(data) {
            if (data["status"] === "on" || data["status"] === 0) {
                $(`#${data["pin"]}`).attr("src","static/images/lampon.png");
                $("#pin_" + data["pin"]).attr({ onclick:`set_status(${ data["pin"] }, 'off')`, value: "Turn off" });
            } else {
                $(`#${data["pin"]}`).attr("src","static/images/lampoff.png");
                $(`#pin_${data["pin"]}`).attr({ onclick:`set_status(${ data["pin"] }, 'on')`, value: "Turn on" });
            }
            console.log(`pin ${pin} was set to:${status}`);
        }
    });
}

function check_server(){
    $.ajax({
        url: '/liveness',
        type: 'POST',
        error: function (){
            alert("Lost Connection to Server");
            if ( $(alert).css('display') == 'none' || $(alert).css("visibility") == "hidden"){
                $("alert").show();
            }
        },
        success: function(data){
            if ( $(alert).css('display') != 'none' || $(alert).css("visibility") != "hidden"){
                $("alert").hide();
            }
            console.log(data)
        },
        complete:function(data){
            setTimeout(check_server,5000);
        }
    });
}
