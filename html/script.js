var ws = new WebSocket('ws://' + window.location.hostname + ':1337');

ws.onmessage = function (event) {
    console.log(event.data);
};

function btdown(key){
    ws.send("<"+key)
}

function btup(key){
    ws.send(">"+key)
}