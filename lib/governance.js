'use strict';

var Common = require('./common');

function GovernanceController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

GovernanceController.prototype.getSuperBlockBudget = function (req, res) {
  var self = this;
  var blockindex = req.params.blockindex || 0;
  this.node.services.axed.getSuperBlockBudget(blockindex,function (err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result);
  })
}
module.exports = GovernanceController;
