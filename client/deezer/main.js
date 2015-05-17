function inject(jsName) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(jsName);
    s.onload = function() {
        this.parentNode.removeChild(this);
    };
    (document.head || document.documentElement).appendChild(s);
}

inject('client.js');