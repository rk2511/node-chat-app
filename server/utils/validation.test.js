var expect = require('expect');
var {isRealString} = require('./validation.js');

describe('Validate the entered strings', () => {
  it('should reject empty string', () => {
    var str = 1234;
    var res =  isRealString(str);
    //expect(res.typeof).toNotBe('string');
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var str = '    ';
    var res = isRealString(str);
    //expect(res.str.length).toBe(0);
    expect(res).toBe(false);
  });

  it('should allow valid strings', () => {
    var str = 'abcd';
    var res = isRealString(str);
    //expect(res.str).toBe(str);
    expect(res).toBe(true);
  });
});
