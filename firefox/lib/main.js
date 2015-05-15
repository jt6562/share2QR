var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var base64 = require("sdk/base64");

var button = buttons.ActionButton({
  id: "share2D",
  label: "Share to QRCode",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function toUTF8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}

function handleClick(state) {
    var cur_url = base64.encode(tabs.activeTab.url);
    var wrapweb_url = "http://wrapweb.heroku.com/wrapweb?url="+cur_url;

    var panel = require("sdk/panel").Panel({
        width: 200,
        height: 200,
        contentURL: self.data.url("qrcode.html"),
    }).show();

    qr_info = {width:180,height:180,text:wrapweb_url};
    panel.port.emit('qrcode', qr_info);
}
