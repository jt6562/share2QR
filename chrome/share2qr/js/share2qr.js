function gen_qrcode(qr_info) {
    $("#qrcode").qrcode(qr_info);
}

function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var url = tabs[0].url;
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function (url) {
        var cur_url = window.btoa(url);
        var wrapweb_url = "http://wrapweb.heroku.com/wrapweb?url="+cur_url;

        qr_info = {width:180,height:180,text:wrapweb_url};
        gen_qrcode(qr_info);
    })
});