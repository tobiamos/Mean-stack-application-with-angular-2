const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

function validUsername(username){
    if(!username){
        return false;
    }else{
        const regex = new RegExp(/^[a-zA-Z0-9]+$/);
        return regex.test(username);
    }
}

function validPassword(password){
    if(!password){
        return false;
    }else{
    const regex = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/)
    return regex.test(password);
    }
}
function passwordLengthChecker(password){
    if(!password){
        return false;
    }else{
        if(password.length < 8 || password.length > 35){
            return false;
        }else{
            return true;
        }
    }
}

 function usernameLengthChecker(username){
     if(!username){
         return false;
     }else{
         if(username.length < 3 || username.length > 15){
             return false;
         }else{
             return true
         }
     }
 }


function emailLengthChecker (email){
    if(!email){
        return false;
    }
    else{
        if(email.length < 5 || email.length > 30){
            return false
        }
        else{
            return true;
        }
    }
}

function validEmail(email){
    if(!email){
        return false;
    }
    else{
        const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        return regex.test(email);
    }

}

const emailValidators = [
    {
        validator: emailLengthChecker,
        message: "Email must be at least 5 characters but no more than 30"
    },
    {
        validator: validEmail,
        message : "Must be a valid email"
    }
];

const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: "Username must be at least 3 characters but no more than 15"
    },
    {
        validator: validUsername,
        message: "Username must be made of only alphabets and numbers"
    }
];

const passwordValidators = [
    {
        validator : passwordLengthChecker,
        message: "Password must be at least 8 characters but no more than 35"
    },
    {
        validator: validPassword,
        message: "Password must have at least one lowercase, uppercase, special character and number"
    }
]

const UserSchema = new Schema({
  email : {type:String, required:true, unique:true, lowercase:true, validate: emailValidators},
  username : {type:String, required:true, unique:true, lowercase:true, validate:usernameValidators},
  password : {type:String, required:true,validate:passwordValidators}
});


UserSchema.pre('save',function(next){
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.hash(this.password,null,null,(err,hash)=>{
        if(err) return next(err);
        this.password = hash;
        next();
    })
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
};
module.exports = mongoose.model('User', UserSchema);