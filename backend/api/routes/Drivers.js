const express=require('express');
const router=express.Router();



router.get('/',(req,res,next)=>
{
    res.status(200).json(
        {
            message:"Driver getWorks ad"
        });

}
);

router.post('/',(req,res,next)=>
{
    const driver=
    {
        driverId:req.body.driverId,
        driverName:req.body.driverName,
        driverAddress:req.body.driverAddress,
        driverNumber:req.body.driverNumber
    }
    res.status(201).json(
        {
            message:"Driver PostWorks ad",
            CreatedDriver: driver
        });

}
);

router.get("/:id",(req,res,next)=>
    {
        const DriverId=req.params.id;
        res.status(200).json(
            {
                message:"Driver id is",
                id:DriverId
            }
            );
    }

);


router.patch('/:id',(req,res,next)=>
{
    const DriverId=req.params.id;
    res.status(200).json(
        {
            message:"Updated Driver"
        }
        );
}
);


router.delete('/:id',(req,res,next)=>
{
    const DriverId=req.params.id;
    res.status(200).json(
        {
            message:"Deleted Driver"
        }
        );
}
);




module.exports=router;