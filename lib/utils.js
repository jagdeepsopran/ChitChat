import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, 
        { expiresIn: "7d" });
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000 ,// 7 days
        httpOnly: true,     //prevent XSS attacks cross-site scripting attacks
        sameSite: 'strict', // prevent CSRF attacks cross-site requests forgery attacks
        secure: process.env.NODE_ENV !== 'development' // cookie works only in https in production,
    });

    return token;
};