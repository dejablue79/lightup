from flask import Flask, render_template, session, request
import RPi.GPIO as GPIO
from os import urandom, getenv


app = Flask(__name__)
app.secret_key = urandom(24)
#pin connected to relay
relay_pins = getenv("relay_pin", [27, 22, 23, 24])

GPIO.setmode (GPIO.BCM)


@app.before_first_request
def before_first_request():
	app.logger.info("Checking current status")
	GPIO.setup(relay_pins, GPIO.OUT)
	for pin in relay_pins:
		session[pin] = GPIO.input(pin)
		app.logger.info(f"{pin} is set to {GPIO.input(pin)}")


#default route, without anything
@app.route("/")
def default():
	data: dict = {
		"relay_pins": relay_pins,
		"session": session
	}
	return render_template('lights.html', data={**data})


# set a route for action
# light on or off
@app.route("/light")
def onAction():
	status = request.args.get("set")
	pin = request.args.get("id")
	if status == "on":
		pin = 0
		GPIO.output (pin, GPIO.LOW)
		#message =  "Light on!"
		print ("on")
	if status == "off":
		pin = 1
		GPIO.output (pin, GPIO.HIGH)
		#message = "Light off!"
		print ("off")
	
	# return to the template with new info
	return render_template ('lights.html',pin=pin)

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=8080, debug=True)


