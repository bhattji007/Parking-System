import express  from 'express';
import Vehicle from '../models/Plate.js'
import Park from '../models/Parking.js'
import Array from '../models/Array.js'

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
const router=express.Router();
async function gt(){
    const d=await Array.find().sort({ _id: -1 })
    let Slot =`${d[0].SLOT}`;
    return Slot;
}
router.get('/',async (req,res)=>{
    try{
        const d=await Array.find().sort({ _id: -1 })
        let Slot =`${d[0]}`; 
        console.log(); 
        res.send(Slot);
        }
        catch(err){
             res.json({message:err});
        }

});

router.post('/in',async (req,res)=>{
    let Slot= await gt();
    const park=new Park();
    const rt=new Array();
    park.PlateNum=req.body.PlateNum;
   
    var datetime = new Date();

    for (let i=0;i<Slot.length;i++){
        if (Slot[i]=='0'){
        park.slot=i
        Slot=Slot.replaceAt(i,'1');
        break;
        }
    }
    try{
    const savedSlot=await park.save();
    res.json(savedSlot);
    }
    catch(err){
         res.json({message:err});
    }
    Slot=Slot+'0';
    rt.SLOT=Slot;
    const saved=await rt.save();
    console.log(Slot);
 })
 router.post('/out',async (req,res)=>{
    let Slot= await gt();
    const park=new Park();
    const array=new Array();
    park.PlateNum=req.body.PlateNum;
    var datetime = new Date();
    var find= await Park.findOneAndDelete({PlateNum:req.body.PlateNum})
    console.log(`parking `,find.slot)
    const s=find.slot
    Slot=Slot.replaceAt(s,'0');
    array.SLOT=Slot;
    console.log("checkout slots",Slot)
    res.json({message:'deleted'})
    const save=await array.save();
    console.log(save)
 })

 export default router ;