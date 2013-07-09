var questions;
var readline = require('readline');
var events = require('events');

questions = (function() {

  function questions() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.qStack = [];
    this.ev = new events.EventEmitter();
    this.on('qAdded', this.queue, this);
    this.on('qRemoved', this.queue, this);
    this.on('qEnded', this.removeFromStack, this);
  }

  questions.prototype.on = function(event, foo, context) {
    var _this = this;
    return this.ev.on(event, function() {
      return foo.apply((context != null ? context : _this), arguments);
    });
  };

  questions.prototype.addQuestion = function(q, callback, context) {
    this.qStack.push({
      q: q,
      callback: callback,
      context: context
    });
    return this.ev.emit('qAdded');
  };

  questions.prototype.queue = function() {
    if (this.qStack.length > 0) {
      this.rl.resume();
      return this.question(this.qStack[0].q, this.qStack[0].callback, this.qStack[0].context);
    } else {
      return this.rl.pause();
    }
  };

  questions.prototype.removeFromStack = function() {
    this.qStack.shift();
    return this.ev.emit('qRemoved');
  };

  questions.prototype.question = function(q, callback, context) {
    var _this = this;
    return this.rl.question(q + ': ', function(data) {
      if (context != null) {
        callback.call(context, data);
      } else {
        callback(data);
      }
      return _this.ev.emit('qEnded');
    });
  };

  return questions;

})();

module.exports = questions;