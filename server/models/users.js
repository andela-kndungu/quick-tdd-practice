import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model('Users', new Schema());
export default model;

