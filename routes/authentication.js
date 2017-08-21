const mongoose = require("mongoose");
const User = require("../models/user");
function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports = router => {
  router.post("/register", (req, res) => {
    if (!req.body.email) {
      sendJsonResponse(res, 400, {
        message: "Email field required",
        success: false
      });
    }
    if (!req.body.username) {
      sendJsonResponse(res, 400, {
        message: "username field required",
        success: false
      });
    }
    if (!req.body.password) {
      sendJsonResponse(res, 400, {
        message: "password field required",
        success: false
      });
    } else {
      let user = new User({
        email: req.body.email.toLowerCase(),
        username: req.body.username.toLowerCase(),
        password: req.body.password
      });
      user.save(function(err, data) {
        if (err) {
          if (err.code === 11000) {
            sendJsonResponse(res, 400, {
              success: false,
              message: "Username or email already exists"
            });
          } else {
            if (err.errors) {
              if (err.errors.email) {
                sendJsonResponse(res, 400, {
                  success: false,
                  message: err.errors.email.message
                });
              }else if (err.errors.password){
                sendJsonResponse(res,400,{
                    success: false,
                    message: err.errors.password.message
                })
              }
              else{
                  if(err.errors.username){
                    sendJsonResponse(res,400,{
                        success:false,
                        message:err.errors.username.message
                    })
                  }
              }
            } else {
              sendJsonResponse(res, 400, err);
            }
          }
        } else {
          sendJsonResponse(res, 200, { success: true, message: "Account Registered" });
        }
      });
    }
  });

  return router;
};
