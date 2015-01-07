function init(jsName)
{
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(jsName);
    s.onload = function()
    {
        this.parentNode.removeChild(this);
    };
    (document.head || document.documentElement).appendChild(s);
    console.log()
}





if (window.document.body.innerText == "loading...")
{
    console.log("Waiting...")
}
else
{
    init('grooveshark.js');
}
