var ws = new WebSocket('ws://' + window.location.hostname + ':1337');

ws.onmessage = function (event) {
    console.log(event.data);
};

function btdown(key, ele){
    ws.send("<"+key)
    ele.style.backgroundImage="url('tap.png'), url('idle.png')"
}

function btup(key, ele){
    ws.send(">"+key)
    ele.style.backgroundImage="url('idle.png')"
}