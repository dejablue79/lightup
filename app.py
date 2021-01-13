from flask import Flask, render_template, session, request, jsonify
import RPi.GPIO as GPIO
from os import urandom, getenv


app = Flask(__name__)
app.secret_key = urandom(24)
#pin connected to relay
# relay_pins = getenv("relay_pin", [27, 22, 23, 24])
relay_pins = [27, 22, 23, 24]

GPIO.setmode(GPIO.BCM)


@app.before_first_request
def before_first_request():
	app.logger.info("Checking current status")
	GPIO.setup(relay_pins, GPIO.OUT)
	for pin in relay_pins:
		session[pin] = GPIO.input(pin)
		app.logger.info(f"{pin} is set to {GPIO.input(pin)}")


@app.route("/")
def default():
	return render_template('lights.html', relay_pins=relay_pins, session=session)


@app.route("/liveness", methods=['POST'])
def liveness():
	return True


@app.route("/check", methods=['POST'])
def check():
	GPIO.setup(relay_pins, GPIO.OUT)
	data = dict()
	for pin in relay_pins:
		data[pin] = GPIO.input(pin)
		app.logger.info(f"{pin} is set to {GPIO.input(pin)}")
	return jsonify(data)


@app.route("/light", methods=['POST'])
def onAction():
	status = request.form["status"]
	pin = int(request.form["pin"])
	GPIO.setup(pin, GPIO.OUT)
	if status == "on":
		GPIO.output(pin, 0)
		print("on")
	if status == "off":
		GPIO.output(pin, 1)
		print("off")
	return jsonify(pin=pin, status=status)


if __name__ == "__main__":
	app.run(host='0.0.0.0', port=8080, debug=True)


