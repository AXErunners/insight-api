'use strict';

var Common = require('./common');
var axecore = require('@axerunners/axecore-lib');
var _ = axecore.deps._;
var deprecatedMessage = 'This endpoint has been deprecated and will be replaced with a new endpoint compatible with the deterministic masternode list introduced in v0.13';

function MasternodeController(node) {
	this.node = node;
	this.common = new Common({log: this.node.log});
}

MasternodeController.prototype.list = function(req, res) {
	res.jsonp(deprecatedMessage);
};

MasternodeController.prototype.validate = function (req, res, next) {
	res.jsonp(deprecatedMessage);
};

MasternodeController.prototype.getMNList = function(callback) {
	this.node.services.axed.getMNList(function(err, result){
		var MNList = result || [];
		if (err) {
			return callback(err);
		}
		callback(null,MNList);
	});
};

module.exports = MasternodeController;
