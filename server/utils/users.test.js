var expect = require('expect');

var {Users} = require('./users.js');

describe(' user test', () => {
var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'vikki',
      room: 'fightclub'
    }, {
      id: '2',
      name: 'viji',
      room: 'fightclub'
    }, {
      id: '3',
      name: 'vijay',
      room: 'batman'
    }];
  });
  it('shoud add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Vikki',
      room: 'fightclub'
    };
    var res = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names of room list', () => {
    var userList = users.getUserList('fightclub');
    expect(userList).toEqual(['vikki','viji']);
  });

  it('should return names of another room list', () => {
    var userList = users.getUserList('batman');
    expect(userList).toEqual(['vijay']);
  });

  it('should find a user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    var userId = '4';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

it('should remove the user', () => {
  var userId = '2';
  var user = users.removeUser(userId);
  expect(user.id).toBe(userId);
  expect(users.users.length).toBe(2);
});

it('should not remove the user', () => {
  var userId = '4';
  var user =  users.removeUser(userId);
  expect(user).toNotExist();
  expect(users.users.length).toBe(3);
});

});
