var express = require('express');
var url = require('url');
var router = express.Router();
const locationModel = require('../model/location');
const userModel = require('../model/user');


/* GET home page. */
router.get('/', (req, res, next) => {
  var queryData = url.parse(req.url, true).query;
  res.render('index', { title: queryData.id, session:req.session.user });
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

router.get('/find', (req, res, next) => {
  res.render('find');
})

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
  if (req.session.user) {
    console.log("로그인됨");
  }
  res.render('login');
})
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  userModel.find({ 'email': email }).then((result) => {
    if (result.length == 0) {
      res.json({
        "result": "emailfalse"
      });
    }else {
      if (password == result[0].password) {
        req.session.user = { 
        user_email: email
        }
        req.session.save(function () { 
          res.json({
          "result":"loginsuccess"
        })
        })
      } else {
        res.json({
        "result":"passwordfalse"
      })
      }
    }
  })
})
router.get('/logout',async function (req, res, next) {
  let session = req.session;
  try {
    if (session.user) {
      await req.session.destroy(function (err) {
        if (err)
          console.log(err)
        else {
          res.redirect('/');
        }
      })
    }
  }
  catch (e) {
    console.log(e)
  }
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

router.get('/mypage', (req, res, next) => { 
  if (req.session.user) {
    userModel.find({ 'email': req.session.user['user_email'] })
      .then((result) => {
        res.render('mypage', {
          username: result[0].username,
          accountname: result[0].accountname,
          email:result[0].email,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
})

module.exports = router;
