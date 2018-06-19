'use strict';

var _ = require('lodash');
var async = require('async');
var Common = require('./common');

function SporkController(node) {
	this.node = node;
	this.common = new Common({log: this.node.log});
}

SporkController.prototype.list = function(req, res){
	var self = this;
	this.getSpork(function(err, result) {
		if (err) {
			return self.common.handleErrors(err, res);
		}
		res.jsonp(result);
	});
};

SporkController.prototype.getSpork = function(callback) {
	this.node.services.axed.getSpork(function(err, result){
		var SporksList = result || [];
		if (err) {
			return callback(err);
		}
		callback(null,SporksList);
	});
};
module.exports = SporkController;