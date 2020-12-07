var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = new Schema({
  surveyId: { type: Schema.ObjectId, required: true, ref: 'Survey' },
  userId: { type: Schema.ObjectId, required: false, ref: 'User' },
  email: {
    type: String
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  question: { type: Schema.ObjectId, required: false },
  choices: [{
    questiontitle: { type: String, required: false },
    questiontype: { type: String },
    answerText: { type: String },
  }],
});

ResultSchema.set('timestamps', true);
module.exports = mongoose.model('result', ResultSchema);
