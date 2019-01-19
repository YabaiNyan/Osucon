# osucon.js
Web Controller for Osu

# Quick Setup for Windows
1) Goto the [releases page](https://github.com/YabaiNyan/Osucon/releases/latest "Click here to goto the releases page") and download `osucon.exe` and `robotjs.node`.
2) Put all files in the same folder and run `osucon.exe`
3) Then connect to the address in the console on a mobile device.

To set custom keys, download osucon.config from the [releases page](https://github.com/YabaiNyan/Osucon/releases/latest "Click here to goto the releases page") and replace `a` in `KEY1=a` and `s` in `KEY2=s` with your corresponding keys, then put the file in the same folder as `osucon.exe`.

# Installation for development
You'll need to first install [nodeJS](https://nodejs.org/en/download/ "Click here to goto the nodeJS download page") and [Python 2.7.x](https://www.python.org/downloads/release/python-2715/ "Click here to goto the Python download page") on the computer you plan to use this on.</br>

Then open a terminal and type</br> 
```git clone https://github.com/YabaiNyan/osucon.git```</br>
```cd osucon```</br>
```npm install```</br>

To run the server, type ```node osucon.js``` into the terminal, then open on a touch device the link logged in the terminal to connect.</br>

## Note for connection
The device has to be on the same local network as the server.
