const mongoose=require('mongoose');



const truckSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    TruckId : String,
    TruckName :String,
    TruckNumber : String
});


module.exports=mongoose.model('Truck',truckSchema);