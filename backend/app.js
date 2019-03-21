const express=require('express');
const app=express();
const morgan=require('morgan'); 
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


const truckRoutes=require('./api/routes/Trucks');
const driverRoutes=require('./api/routes/Drivers');


mongoose.connect('mongodb://localhost:27017/LocationService1',
{
    useNewUrlParser:true
}
,(err)=>
{
    if(!err)
    {
        console.log("connection sucessful");
    }
    else
    {
        console.log("connection Error");
    }
}
);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use("/Truck",truckRoutes);
app.use("/Driver",driverRoutes);



app.use((req,res,next)=>
{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin','X-Requested-With','Content-Type','Accept','Authorization');
    if(req.method==='OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE','GET');
        return res.status(200).json({});
    }
    next(); 
}
);

 
app.use((req,res,next)=>
{
    const error=new Error('404 not Found');
    error.status=404;
    next(error);
}
);

app.use((error,req,res,next)=>
{
    res.status(error.status || 500);
    res.json({
            error:{
                message:error.message
            }   
        });
}
);

module.exports=app;