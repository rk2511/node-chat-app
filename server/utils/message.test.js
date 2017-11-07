var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('Test the message' , () => {
  it('should generate correct message object', () => {
    var from = 'Admin';
    var text = 'This is a test message';
    var res = generateMessage(from,text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(res).toInclude({from,text});
    expect(res.createdAt).toBeA('number');
  });
});
