import express from 'express';

const app = express();
class ErrorHandler extends Error {
  constructor(message , statusCode){ 
     super(message);
     this.statusCode = statusCode;
  }  
}

app.get('/' , (req , res , next)=>{
    console.log("hello is the new trend");
    return next(new ErrorHandler("this is error threw custommmm error handler" , 402))
})



//this is a error middleware 
//custom error handler for our app and make sure it's in the last of the the app so the next function
// can call the custom error handler
//the custom error handler first parimeter is error
app.use((error , req , res  , next)=> {
    error.message = error.message || " Internal Server Error ";
    error.statusCode = error.statusCode || 404 ;
    // console.log(error.message , error.statusCode);
    res.status(error.statusCode).json({
        message:error.message,
    })
})
app.listen(4000 , ()=>{
    console.log("Listining on port 4000");
})