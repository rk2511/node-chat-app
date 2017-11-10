var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

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

describe('Test the location', () => {
  it('Should generate the location', () => {
    var from = 'Admin';
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1'
    var res = generateLocationMessage(from,latitude,longitude);
    expect(res.from).toBe(from);
    expect(res).toInclude({from,url});
    expect(res.url).toBe(url);
    expect(res.createdAt).toBeA('number');
  });
});
