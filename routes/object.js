import express from 'express';
import service from '../services/key-value-service';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('instruction', { title: 'instructions' });
});

router.get('/:key', function(req, res, next) {
  try {
    // handle timestamp query (req.query)
    service.getObject(req.params.key, req.query.timestamp, (doc) => {
      return res.send(doc);
    })  
  } catch (ex) {
    return res.send(ex);
  }
});

router.post('/', function(req, res, next) {
  const json = req.body;
  if (!json) {
    return res.send('invalid data, check api doc');
  }

  try {
    // only output the last response.
    for (const key in json) {
      const value = json[key];
      service.saveObject(key, value, (doc) => {
        res.send(doc);
      });
    }
  } catch (ex) {
    return res.send(ex);
  }

});

module.exports = router;
