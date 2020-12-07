
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    questiontitle: { type: String, required: true },
    questiontype: { type: String },
    options: [
        {
            optiontext: { type: String, required: true }
        }
    ]
});

QuestionSchema.set('timestamps', true);
module.exports.schema = QuestionSchema;
const QuestionModel = mongoose.model('question', QuestionSchema);
module.exports = QuestionModel;