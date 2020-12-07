
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuestionSchema = require('./question').schema;

var SurveySchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  expirydate: { type: Date, default: Date.now },
  user: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user'
  },
  questionnaires: [QuestionSchema],
});

SurveySchema.set('timestamps', true);

module.exports = mongoose.model('survey', SurveySchema);