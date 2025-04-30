import jwt from 'jsonwebtoken';

const generateToken = (res,userId) => {
     const token = jwt.sign({userId},process.env.JWT_SECRET,{
          expiresIn:'20d'
     })
     res.cookie('jwt',token,{
          httpOnly:true,
          secure:process.env.Node_Evn !== '\development',
          samesite:'string',
          maxAge:30*24 * 60* 60*1000
     })
}


export default generateToken;