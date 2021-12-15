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


// patch
app.patch('/user/deposit/:account_id', auth(), async (req,res)=>{
  const data = req.body;
  try {
      const userAccount = await User.findOne({user_id: req.params.account_id});
      if(userAccount.user_id === req.USER_ID){
          return res.status(403).send({
              message:"Invalid account details"
          })
      }

    
      if(!userAccount){
          // console.log(userAccount);
          return res.status(400).send({message:"No Account for deposit"})
      }
      const newAccBal =await User.findByIdAndUpdate(req.params.account_id,
          {
              $inc : {amount : data.amount}
          }, {new:true})

          res.status(200).send({message: "Deposit Successful!!!", data: newAccBal})
  } catch (error) {
      res.status(400).send({message: "Failed Deposit XXXX", error:error.message})
  }
})

// post
app.post('/user/deposit', auth(),async (req,res)=>{
  const data = req.body;
 
  try {
      const account = await new Account({
          user_id:data.user_id,
          amount:data.amount,
      }).save();
      res.status(201).send({message: "First Deposit Successful!!!", data:account})
  } catch (error) {
      res.status(400).send({message: "Failed!!! First Deposit", error: error.message})
  }

    
})


db.getCollection('noti').findOneAndUpdate(
  { _id: ObjectId("5bc061f05a4c0511a9252e88") }, 
  { $push: { 
            graph: {
              "date" : ISODate("2018-10-24T08:55:13.331Z"),
              "count" : 10.0
              }  
          },
     $inc: { count: 1 } 
  }, {new: true })