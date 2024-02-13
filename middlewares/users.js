export const authMiddleware = (req, res, next) => {
    const secretToken = process.env.SECRET_TOKEN;
    const {userToken} = req.body;
 
    if(!userToken || userToken !== secretToken){
         return res.status(401).json({error: 'Unauthorized'})
    } else {
         next();
    }
 
 }