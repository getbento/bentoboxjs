var Newsletter = require('./newsletter.js');
var Reservations = require('./reservations.js');
var Utils = require('./utils.js');
var Forms = require('./forms.js');

var Bento = {};

Bento.Utils = Utils;
Bento.Newsletter = Newsletter;
Bento.Reservations = Reservations;
Bento.Forms = Forms;

window.Bento = Bento;

module.exports = Bento;