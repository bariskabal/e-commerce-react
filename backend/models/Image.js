
// models/Image.js veya benzeri bir dosyada
const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = mongoose.model('Image', new mongoose.Schema({}, { strict: false }));

module.exports = imageSchema;