import database from '../models/database';
import KeyValue from '../models/key-value';

const service = {};

service.getObject = (key, timestamp, next) => {
  // handle timestamp query
  if (!timestamp) {
    // if timestamp isn't included, use latest time.
    timestamp = Date.now();
  };

  KeyValue.find({ 
      key, 
      timestamp: { '$lte': timestamp } 
    }, (err, doc) => {
      if (err) throw err;
      // if key does not exist, return empty object.
      if (doc.length === 0) {
        return next({});
      }

      return next({ 
        value: doc[0].value,
      })
  }).limit(1);
};

service.saveObject = (key, value, next) => {
  // @TODO fix UTC timezone.
  const timestamp = Date.now();
  const object = KeyValue({
    key, value, timestamp,
  });
  object.save((err) => {
    if (err) throw err;
    return next({
      key,
      value,
      timestamp,
    });
  })
};

export default service;
