import jwt from 'jsonwebtoken';

const generateToken = (res,userId) => {
  const token = jwt.sign({ userId } , process.env.JWT_SECRET ,  {
    expiresIn : '30d',
  });

  res.cookie('jwt' , token , {
    httpOnly : true,
    secure : process.env.NODE_ENV !== 'development', // use secure cookies in production
    sameSite : 'strict', // prevent CSRF attacks
    maxAge : 30 * 24 * 60 * 60 * 1000, // 30days
  })
}

export default generateToken;