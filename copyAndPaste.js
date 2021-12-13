User.insertMany([
    { name: 'Gourav', age: 20},
    { name: 'Kartik', age: 20},
    { name: 'Niharika', age: 20}
]).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});


const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./../models/user")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const auth = {}

auth.signup = async (req, res) => {
  const data = req.body

  try {
    const passwordHash = await bcrypt.hash(data.password, 10)
    const user = await new User({
      email: data.email,
      password: passwordHash,
      full_name: data.full_name
    }).save()

    const token = jwt.sign({ user_id: user._id }, JWT_SECRET_KEY, { expiresIn: 60 * 10 })

    res.status(201).send({
      message: "User created",
      data: {
        token,
        user_id: user._id,
        email: user.email,
        full_name: user.full_name
      }
    })
  } catch (error) {
    res.status(400).send({ message: "User couldn't be created", error })
  }

}
