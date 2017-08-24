const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/db");
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
              } else if (err.errors.password) {
                sendJsonResponse(res, 400, {
                  success: false,
                  message: err.errors.password.message
                });
              } else {
                if (err.errors.username) {
                  sendJsonResponse(res, 400, {
                    success: false,
                    message: err.errors.username.message
                  });
                }
              }
            } else {
              sendJsonResponse(res, 400, err);
            }
          }
        } else {
          sendJsonResponse(res, 200, {
            success: true,
            message: "Account Registered"
          });
        }
      });
    }
  });

  router.get("/checkEmail/:email", (req, res) => {
    if (!req.params.email) {
      res.json({ success: false, message: "Email was not provided" });
    } else {
      User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (user) {
            res.json({ success: false, message: "Email is already taken" });
          } else {
            res.json({ success: true, message: "Email is available" });
          }
        }
      });
    }
  });

  router.get("/checkUsername/:username", (req, res) => {
    if (!req.params.username) {
      res.json({ success: false, message: "Username was not provided" });
    } else {
      User.findOne({ username: req.params.username }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (user) {
            res.json({ success: false, message: "Username is already taken" });
          } else {
            res.json({ success: true, message: "Username is available" });
          }
        }
      });
    }
  });

  router.post("/login", (req, res) => {
    if (!req.body.username) {
      res.json({ success: false, message: "No username was provided" });
    } else if (!req.body.password) {
      res.json({ success: false, message: "No password was provided" });
    } else {
      User.findOne(
        { username: req.body.username.toLowerCase() },
        (err, user) => {
          if (err) {
            res.json({ success: false, message: err });
          } else if (!user) {
            res.json({ success: false, message: "Username not found" });
          } else {
            const validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
              res.json({ success: false, message: "Password Invalid" });
            } else {
              const token = jwt.sign({ userId: user._id }, config.secret, {
                expiresIn: "24h"
              });
              res.json({
                success: true,
                message: "Success!!",
                token: token,
                user: { username: user.username }
              });
            }
          }
        }
      );
    }
  });

  router.use((req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token){
      res.json({success:false , message : "No token Provided"});
    }else{
      jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
          res.json({success:false, message:"Token Invalid" + err})
        }else{
          req.decoded = decoded;
          next();
        }
      })
    }
  })
  router.get('/profile', (req,res)=>{
    User.findOne({_id: req.decoded.userId}).select('username email').exec((err,user)=>{
      if(err){
        res.json({success:false , message:err});
      }else if (!user){
        res.json({success: false , message: "User not found"});
      }else{
        res.json({success:true, user: user});
      }
    });
  });

  return router;
};
