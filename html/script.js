var firstfail = true;
var refused = false;
var ws, connecttimeout;

function connect(){
    setTimeout(function(){
        ws = new WebSocket('ws://' + window.location.hostname + ':1337');
        ws.onopen = function(){
            document.getElementById("cover").style.display = "none";
            clearTimeout(connecttimeout);
            connecttimeout = setTimeout(function(){
                failtimeout();
                return;
            }, 1000)
            ws.onmessage = function (event) {
                switch(event.data){
                    case "==":
                        clearTimeout(connecttimeout);
                        connecttimeout = setTimeout(function(){
                            failtimeout();
                            return;
                        }, 1000)
                        setTimeout(function(){
                            if(ws.readyState != ws.CLOSED){
                                ws.send("==")
                            }
                        }, 100)
                    break
                    case "err01":
                        refused = true;
                        connectionrefused();
                    break
                    default:
                        console.log(event.data);
                    break
                }
            };
        }
    },1000)
}

connect();

function btdown(key, e, ele){
    if(e.targetTouches.length == 1){
        ws.send("<"+key)
        ele.style.backgroundImage="url('tap.png'), url('idle.png')"
    }
}

function btup(key, e, ele){
    if(e.targetTouches.length == 0){
        ws.send(">"+key)
        ele.style.backgroundImage="url('idle.png')"
    }
}

function rlog(a){
    ws.send("!"+a)
}

function failtimeout(){
    if(!refused){
        if(firstfail){
            firstfail = false;
            var h1 = document.createElement("H1");
            var textnode = document.createTextNode("Server disconnected, attempting to reconnect");
            h1.style.color = "white";
            h1.appendChild(textnode); 
            document.getElementById("wrapper").appendChild(h1); 
        }
        document.getElementById("cover").style.display = "block";
        setTimeout(function(){
            connect();
        },2000)
    }
}

function connectionrefused(){
    var h1 = document.createElement("H1");
    var textnode = document.createTextNode("Connection was refused; Another device is already connected.");
    h1.style.color = "white";
    h1.appendChild(textnode); 
    var h12 = document.createElement("H1");
    var textnode2 = document.createTextNode("Reload page to attempt to reconnect.");
    h12.style.color = "white";
    h12.appendChild(textnode2);
    document.getElementById("cover").appendChild(h1); 
    document.getElementById("cover").appendChild(h12); 
    document.getElementById("wrapper").remove();
    document.getElementById("cover").style.display = "block";
}