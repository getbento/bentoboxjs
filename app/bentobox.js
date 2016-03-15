var Newsletter = require('./newsletter.js');
var Reservations = require('./reservations.js');
var Utils = require('./utils.js');
var Forms = require('./forms.js');
var GiftCards = require('./giftcards.js');

var Bento = {};

Bento.Utils = Utils;
Bento.Newsletter = Newsletter;
Bento.Reservations = Reservations;
Bento.Forms = Forms;
Bento.GiftCards = GiftCards;

window.Bento = Bento;

module.exports = Bento;
