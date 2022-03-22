var express = require('express');
var router = express.Router();
const locationModel = require('../model/location');
const userModel = require('../model/user');

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Express' });
});
//화살표 함수
router.get('/upload', (req, res, next) => {
  res.render('upload');
});

router.get('/test', (req, res, next) => {
  console.log("테스트 완료");
  res.json({
    message: "response 완료!!",
  });
});
router.post('/test2', (req, res, next) => {
  const { test, test2 } = req.body;
  console.log(test,test2);
  res.json({
    message: "post 완료!",
  });
});

router.post('/location', (req, res, next) => {
  const { title, address, lat, lng } = req.body;
  let location = new locationModel();
  location.title = title;
  location.address = address;
  location.lat = lat;
  location.lng = lng;
  location.save()
    .then((result) => {
    console.log(result);
    res.json({
      message: "success",
    });
  })
  .catch((error) => {
    console.log(error);
    res.json({
      message: "error",
    });
  });
});

router.get('/location', (req, res, next) => {
  locationModel.find({}, { _id: 0, _v: 0 }).then((result) => {
    console.log(result);
    res.json({
      message: "success",
      data: result,
    });
  }).catch((error) => {
    res.json({
      message: "error",
    });
  });  
})

router.get('/login', (req, res, next) => {
  res.render('login');
})
router.post('login', (req, res, next) => {
  
})
router.get('/signup', (req, res, next) => {
  res.render('signup');
})
router.post('/signup', (req, res, next) => {
  const { username, accountName, password, userEmail } = req.body;
  let user = new userModel();
  user.username = username;
  user.accountname = accountName;
  user.password = password;
  user.email = userEmail;

  userModel.find({'accountname':accountName}).then((result) => {
    if (result.length == 0) { 
      user.save()
        .then((result) => {
          console.log(result);
          res.json({
            message: "success",
          });
          
        })
        .catch((error) => {
          console.log(error);
          res.json({
            message: "error",
          });
        });
    } else {
      res.json({
            message: "account error",
          });
    }
    // console.log("data:", username,accountName, userEmail, password);
  });

});

module.exports = router;
