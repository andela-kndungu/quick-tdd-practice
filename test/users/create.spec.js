import should from 'should'; // eslint-disable-line
import request from 'supertest';

import app from '../../server/index.js';

describe('Create', () => {
  describe('Successfully creates a new user', () => {
    it('Does not create duplicate user', () => {
      request(app)
        .post('/api/user')
        .send({
          email: 'existing@user.com',
          username: 'existing',
          firstName: 'Existing',
          lastName: 'User',
          password: 'existing'
        })
        .expect('Content-Type', /json/)
        .expect(409)
        .end((error, res) => {
          should.not.exist(error);
          res.body.message.should.eql('User already exists');
        });
    });

    it('Creates a user with a role defined', () => {
      request(app)
        .post('/api/user')
        .send({
          email: 'new@user.com',
          username: 'new',
          firstName: 'New',
          lastName: 'User',
          password: 'new'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, res) => {
          should.not.exist(error);
          res.body.role.length.should.be.above(0);
        });
    });

    it('Creates a user with both names defined', () => {
      request(app)
        .post('/api/user')
        .send({
          email: 'john@user.com',
          username: 'john',
          firstName: 'John',
          lastName: 'Doe',
          password: 'john'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, res) => {
          should.not.exist(error);
          res.body.name.first.should.equal('John');
          res.body.name.last.should.equal('Doe');
        });
    });

    it('Does not create a user without both names being defined', () => {
      request(app)
        .post('/api/user')
        .send({
          email: 'john@user.com',
          username: 'john',
          password: 'john'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((error, res) => {
          should.not.exist(error);
          res.body.message.should.equal('Both names must be provided');
        });
    });
  });
});

