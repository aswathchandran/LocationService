const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');


const Truck=require('../models/Truck');



router.get('/',(req,res,next)=>
{
    Truck.find()
    .exec()
    .then(doc=>
        {
            if(doc)
            {
                console.log("From db:"+doc);
                res.status(200).json(doc);
            }
            else
            {
                res.status(500).json({message:"no entry found"});
            }
        })
    .catch(err=>
        {
            console.log(err);
        }
    );

}
);

router.post('/',(req,res,next)=>
{
    const truck=new Truck(
        {
            _id:new mongoose.Types.ObjectId,
            TruckId:req.body.truckId,
            TruckName:req.body.truckName,
            TruckNumber:req.body.truckNumber
        }
    );
    truck.save().
        then(result=>
        {
            console.log(result);
                res.status(201).json(
                    {
                        message:"Truck PostWorks ad",
                        createdTruck:truck
                    });
        }
        
        )
        .catch(err=>
        {
            console.log(err);      
            res.status(500).json({error:err});    
        }
        );
    
   

}
);

router.get("/:id",(req,res,next)=>
    {
        const TruckID=req.params.id;
        Truck.findById(TruckID)
        .exec()
        .then(doc=>
                    {
                        if(doc)
                        {
                        console.log('From Database'+doc);
                        res.status(200).json(doc);
                        }
                        else
                        {
                            res.status(500).json({message:'404 not found'});
                        }
                    }
                   
            )
        .catch(err=>
        {
            if(!err)
            {

            }
            else
            {
                console.log(err);
                res.status(500).json({error:err});
            }
        }
            );
    }

);


router.patch('/:id',(req,res,next)=>
{
    const TruckID=req.params.id;
    const updateOPS={};
    for(const ops of req.body)
    {
        updateOPS[ops.propName]=ops.value;
    }
    Truck.update({_id:TruckID},{$set : updateOPS})
    .exec()
    .then(doc=>
            {
                if(doc)
                {
                    console.log(doc);
                    res.status(200).json({message:"updated sucessfully"})
                }
            }
        )
    .catch(err=>
        {
            
            console.log(err);      
            res.status(500).json({error:err}); 
        }
        );
}
);


router.delete('/:id',(req,res,next)=>
{
    const TruckID=req.params.id;
    Truck.remove({_id:TruckID})
    .exec()
    .then(doc=>
        {
            console.log(doc);
            if(doc)
            {
                res.status(200).json({message:'deletec from db'});
            }
            else
            {
                res.status(500).json({message:"no item found"});
            }
        }
    )
    .catch(err=>
        {
            console.log(err);      
            res.status(500).json({error:err}); 
        }
        );

}
);




module.exports=router;