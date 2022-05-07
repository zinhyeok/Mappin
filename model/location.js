const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    text: { type: String, required: true, default: "맛있다" },
    username: { type: String, required: true, default: "matziplife" },
});
module.exports = mongoose.model("location", locationSchema );
