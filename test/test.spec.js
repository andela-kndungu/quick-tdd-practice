import should from 'should'; // eslint-disable-line

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      ([1, 2, 3].indexOf(4).should.eql(-1));
    });
  });
});

