//require
var robot = require("robotjs");
var connect = require('connect');
var serveStatic = require('serve-static');
const WebSocket = require('ws');
var os = require('os');

//package configs
robot.setKeyboardDelay(1);
const wss = new WebSocket.Server({ port: 1337 });

//true or false if connection is active
var activeconnection = false;
var activedevice = '';

//html sever
connect().use(serveStatic(__dirname+"/html")).listen(8080, function(){
    console.log('HTML Server is running on http://' + getipv4() + ':8080');
});

//websocket handler 
wss.on('connection', function connection(ws, req) {

    if(activeconnection){
        console.log("Failed connection attempt from device "+req.connection.remoteAddress)
        ws.send("err01")
        return
    }

    activeconnection = true
    activedevice = req.connection.remoteAddress
    console.log("Connection established from device "+req.connection.remoteAddress)
    
    ws.send("==")
    var connecttimeout = setTimeout(function(){
        failtimeout();
    }, 1000)

    ws.on('message', function incoming(message) {
        if(message == "=="){
            clearTimeout(connecttimeout);
            connecttimeout = setTimeout(function(){
                failtimeout();
            }, 1000)
            setTimeout(function(){
                if(ws.readyState != ws.CLOSED){
                    ws.send("==")
                }
            }, 250)
        }
        if(message.startsWith("!")){
            console.log(message)
        }else if(!message.startsWith("=")){
            var splitmsg = message.split("")
            if(splitmsg[0] == "<"){
                robot.keyToggle(splitmsg[1], 'down')
            }else{
                robot.keyToggle(splitmsg[1], 'up')
            }
        }
    });
});

//getipv4
function getipv4(){
    var ifaces = os.networkInterfaces();
    var addr = [];
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            addr.push(iface.address)
        } else {
            // this interface has only one ipv4 adress
            addr.push(iface.address)
        }
        ++alias;
        });
    }); 
    return addr[0];
}

function failtimeout(){
    console.log("Connection timeout to device "+activedevice)
    activedevice = ''
    activeconnection = false
}