const UserModel = require("../models").usr;
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')



const register = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({
            errors:errors.mapped()
        })
    }
    try {
      let body = req.body
      body.password =  await bcrypt.hashSync(body.password,10)
      const users = await UserModel.create(body);
      console.log(users)
  
      res.json({
        status: "Succes",
        messege: "Register Berhasil",
      });
    } catch (error) {}
  }





module.exports = {register}