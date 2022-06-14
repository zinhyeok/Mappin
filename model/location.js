const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    title: { type: String, required: true }, // 가게 이름
    address: { type: String, required: true }, // 가게 주소
    lat: { type: Number, required: true }, // 위도
    lng: { type: Number, required: true }, // 경도
    text: { type: String, required: true, default: "맛있다" }, //한줄 소개
    username: { type: String, required: true, default: "matziplife" }, //SNS 계정 이름
    img: {type: String, required: false, default: "https://www.foodbank.co.kr/news/photo/201712/53774_9846_153.jpg"},
    markerImg: {type: String, required: false, default: 'https://www.foodbank.co.kr/news/photo/201712/53774_9846_153.jpg'},
    url: {type: String, required:false}, //SNS 게시글 링크
});
module.exports = mongoose.model("location", locationSchema );
