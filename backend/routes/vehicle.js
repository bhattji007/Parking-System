import express  from 'express';
import Vehicle from '../models/Plate.js'
import Park from '../models/Parking.js'
import {assignParking,deleteParking} from '../utils/parking.js'

const router=express.Router();

router.get('/',async (req,res)=>{
    try{
        const vehicles=await Vehicle.find();  
        res.json(vehicles);
        }
        catch(err){
             res.json({message:err});
        }
});


router.get('/:PlateNum',async (req,res)=>{
     try{
    const vehicle= await Vehicle.findById(req.params.PlateNum)
     res.json(vehicle);
     }
     catch(err){
          res.json({message:err});
     }
 });






router.post('/out',async (req,res)=>{
     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const duplicate= await Vehicle.find({PlateNum:req.body.PlateNum}).exec();
//     console.log(duplicate[0].Entry)
    if (duplicate[0]){
     deleteParking(req.body.PlateNum);
     const date=new Date();
     const diff = date-duplicate[0].Entry
     const fare=diff*.0000034
     const filter ={PlateNum:duplicate[0].PlateNum}
     const update={Exit:date,fare:fare}
    let doc = await Vehicle.findOneAndUpdate(filter,update,{new:true})
    console.log(doc);
     res.json({doc});
    }
    else{
     res.json({message:"Car has not entered in the system"});
    }
}
 );
 router.post('/in',async (req,res)=>{
     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const vehicle=new Vehicle
    vehicle.PlateNum=req.body.PlateNum;
    vehicle.Entry=new Date();
    vehicle.Exit=null;
    vehicle.fare=null;
    vehicle.Slot=null;
    let slot = await assignParking(req.body.PlateNum);
    vehicle.Slot=slot;
    try{
    const savedPlate=await vehicle.save();
    res.json(savedPlate);
    }
    catch(err){
         res.json({message:err});
    }
     }

 );


 export default router ;