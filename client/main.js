function inject(jsName) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(jsName);
    s.onload = function() {
        this.parentNode.removeChild(this);
    };
    (document.head || document.documentElement).appendChild(s);
    console.log()
}

function init() {
    inject('grooveshark.js');
}

var timeout = 100;

if (window.document.body.innerText == "loading...") {
    console.log("Waiting...")
    timeout = 3000;
}

setTimeout(init, timeout);
