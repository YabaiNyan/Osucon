var ws = new WebSocket('ws://' + window.location.hostname + ':1337');

ws.onmessage = function (event) {
    console.log(event.data)
};

var touchobj = {    }
var leavingobj = {    }

function handletouch(e){
    for(var i=0; i < e.changedTouches.length; i++) {
        var touchId = e.changedTouches[i].identifier;
        var x       = e.changedTouches[i].pageX;
        var y       = e.changedTouches[i].pageY;
    }
    if(x<0 || y<0 || x>viewport().width || y>viewport().height ){return}
    var element = document.elementFromPoint(x, y)
    if(element.value != '' && element.nodeName == "BUTTON"){
        if(touchobj[touchId] != element.value){
            if(!(Object.values(touchobj).indexOf(element.value) > -1)){
                var tempObj = Object.assign({}, touchobj)
                tempObj[touchId]=null
                if(touchobj[touchId] != null && !(Object.values(tempObj).indexOf(touchobj[touchId]) > -1)){
                    ws.send(">" + touchobj[touchId])
                    document.getElementById(touchobj[touchId]).style.backgroundImage="url('idle.png')"
                }
                ws.send("<" + element.value)
                element.style.backgroundImage="url('tap.png'), url('idle.png')"
            }else{
                if(touchobj[touchId] != null){
                    ws.send(">" + touchobj[touchId])
                    document.getElementById(touchobj[touchId]).style.backgroundImage="url('idle.png')"
                }
            }
            touchobj[touchId]=element.value
        }
    }
    e.preventDefault();
}

function touchleave(e){
    for(var i=0; i < e.changedTouches.length; i++) {
        var touchId = e.changedTouches[i].identifier;
    }
    var tempObj = Object.assign({}, touchobj)
    tempObj[touchId]=null
    if(!(Object.values(tempObj).indexOf(touchobj[touchId]) > -1)){
        ws.send(">" + touchobj[touchId])
        document.getElementById(touchobj[touchId]).style.backgroundImage="url('idle.png')"
    }
    if(e.touches.length == 0 && Object.keys(touchobj).length > 0){
        for (var varkey in touchobj){
            if (touchobj[varkey] == touchobj[touchId]){
                delete touchobj[varkey]
            }
        }
    }
    delete touchobj[touchId]
    e.preventDefault();
}

function viewport(){
    var e = window, a = 'inner';
    if ( !( 'innerWidth' in window ) ){
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function rlog(a){
    ws.send("!"+a)
}