# jucon.js
Web Controller for Jubeat

## Note
Note that currently the code is meant to be used in conjunction with an arduino-compatible board so that phyiscal keypressed work.
Currently tested on a teensy 2++ with teensyduino. Please upload /teensy_serial_hid/teensy_serial_hid.ino to an arduino that supports keyboard emulation, then replace `COM4` in jucon.js with the serial identifier of the arduino.
If physical keyboard inputs are not required, you can start the script with `node jucon.js softinput` to use robotjs software input instead.

# Installation
You'll need to first install [nodeJS](https://nodejs.org/en/download/ "Click here to goto the nodeJS download page") on the computer you plan to use this on.</br>

Then open a terminal and type</br>
```git clone https://github.com/YabaiNyan/jucon.git```</br>
```cd jucon```</br>
```npm install```</br>

To run the server, type ```node jucon.js``` (or ```node jucon.js softinput``` for pure software input) into the terminal, then open on a touch device the link logged in the terminal to connect.</br>

## Note for connection
The device has to be on the same local network as the server.
