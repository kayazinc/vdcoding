import mongoose from 'mongoose';
const { Schema } = mongoose;

// create a schema
const KeyValueSchema = new Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
  timestamp: {type: Number, required: true },
});

// sort by timestamp descending so that latest value will be returned.
KeyValueSchema.index({ key: 1, timestamp: -1});
const KeyValue = mongoose.model('keyvalue', KeyValueSchema);

export default KeyValue;