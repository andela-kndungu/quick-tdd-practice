import should from 'should'; // eslint-disable-line
import request from 'supertest';
import Users from '../../server/models/users.js';

import app from '../../server/index.js';

describe('Fetch', () => {
  let user;
  before((done) => {
    const newUser = new Users();
    newUser.username = 'normal';
    newUser.name.first = 'Normal';
    newUser.name.last = 'User';
    newUser.email = 'normal@user.com';
    newUser.password = 'normal';
    newUser.save((error, createdUser) => {
      if (error) {
        throw error;
      }
      user = createdUser;
      done();
    });
  });

  describe('Successfully retrieves requested users', () => {
    it('Fetches all users', () => {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(409)
        .end((error, res) => {
          should.not.exist(error);
          res.body.length.should.be.above(0);
        });
    });

    it('Fetches user by id', () => {
      request(app)
        .get(`/api/users?id=${user._id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, res) => {
          should.not.exist(error);
          res.body.username.should.equal('normal');
        });
    });
  });

  describe('Handles non existent users', () => {
    it('Returns error message on non existent user', () => {
      request(app)
        .get('/api/users?id=573b7edafe90559c354b81fd')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((error, res) => {
          should.not.exist(error);
          res.body.message.should.equal('User does not exist');
        });
    });
  });
});

