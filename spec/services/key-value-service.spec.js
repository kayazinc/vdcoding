import service from '../../services/key-value-service';
import KeyValue from '../../models/key-value';

const key = 'testkey';

// NOTE: run test only on dev environment!
describe('test use-cases only', () => {
  const timestamp600 = 1515002400;
  const value1 = 'vaultdragon';
  const timestamp605 = 1515002405;
  const value2 = 'dragonvault';
  const timestamp603 = 1515002403;

  it('should return object saved with timestamp', (done) => {
    spyOn(Date, 'now'). and.returnValue(timestamp600);

    try {
      service.saveObject(key, value1, (doc) => {
        expect(doc.key).toBe(key);
        expect(doc.value).toBe(value1);
        expect(doc.timestamp).toBe(timestamp600);
        done();
      });
    } catch (ex) {
      fail('should not throw on saving to db, database not started?');
      done();
    }
  });

  it('should return object saved with a valid key', (done) => {
    service.getObject(key, undefined, (doc) => {
      expect(doc.value).toBe(value1);
      done();
    });
  });

  it('should update object of the same key', (done) => {
    spyOn(Date, 'now'). and.returnValue(timestamp605);

    try {
      service.saveObject(key, value2, (doc) => {
        expect(doc.key).toBe(key);
        expect(doc.value).toBe(value2);
        expect(doc.timestamp).toBe(timestamp605);
        done();
      });
    } catch (ex) {
      fail('should not throw on saving to db, database not started?');
      done();
    }
  });

  it('should return latest object saved', (done) => {
    service.getObject(key, undefined, (doc) => {
      expect(doc.value).toBe(value2);
      done();
    });
  });

  it('should return object verisoned based on the timestamp', (done) => {
    service.getObject(key, timestamp603, (doc) => {
      expect(doc.value).toBe(value1);
      done();
    });
  });

});

describe('test exception cases', () => {
  it('should return empty object if key does not exist', (done) => {
    service.getObject('unknownkey', undefined, (doc) => {
      expect(doc.value).toBeFalsy();
      done();
    });
  });

});

afterAll(() => {
  // clean-up database.
  KeyValue.remove({key}, (err) => {});
});

