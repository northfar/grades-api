import {db} from './index.js'

const {model, Schema} = db.mongoose

const gradeSchema = new Schema({
    name: {type: String, required: true},
    subject: {type: String, required: true},
    type: {type: String, required: true},
    value: {type: String, required: true},
    lastModified: {type: String, default: new Date}
})

export default model('grades', gradeSchema)