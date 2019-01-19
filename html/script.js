var ws = new WebSocket('ws://' + window.location.hostname + ':1337');

ws.onmessage = function (event) {
    console.log(event.data);
};

function btdown(key, e, ele){
    if(e.targetTouches.length == 1){
        ws.send("<"+key)
        ele.style.backgroundImage="url('tap.png'), url('idle.png')"
    }
}

function btup(key, e, ele){
    if(e.targetTouches.length == 0){
        ws.send(">"+key)zzzzzzzz
        ele.style.backgroundImage="url('idle.png')"
    }
}

function rlog(a){
    ws.send("!"+a)
}