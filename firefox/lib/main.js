var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var base64 = require("sdk/base64");

var button = buttons.ActionButton({
  id: "share2QR",
  label: "Share to QRCode",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

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
    console.log(wrapweb_url)
}
