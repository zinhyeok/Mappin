const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    title: { type: String, required: true }, // 가게 이름
    address: { type: String, required: true }, // 가게 주소
    lat: { type: Number, required: true }, // 위도
    lng: { type: Number, required: true }, // 경도
    text: { type: String, required: true, default: "맛있다" }, //한줄 소개
    username: { type: String, required: true, default: "matziplife" }, //SNS 계정 이름
    img: {type: String, required: false, default: "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/279805368_5274829449205125_2146703393296336547_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=W5QZejpHDgYAX-MyorC&edm=ALQROFkBAAAA&ccb=7-4&ig_cache_key=MjgzMDYyNDAwMDQxMTcwMDgwMg%3D%3D.2-ccb7-4&oh=00_AT8dso4JddhMpso8FuLPV4m9thFBYYKUFZwy8jaljhd-Aw&oe=627D8FD6&_nc_sid=30a2ef"},
    url: {type: String, required:false}, //SNS 게시글 링크
});
module.exports = mongoose.model("location", locationSchema );
