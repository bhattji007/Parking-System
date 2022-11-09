// const axios = require('axios');
import axios from 'axios';
export async function assignParking(PlateNum){
    let json=JSON.stringify({
        "PlateNum": `"${PlateNum}"`
      })
const data= await axios.post("http://localhost:5000/parking/in",json, {
    headers: {
        'Content-Type': 'application/json'
    }
}).then(res=>{return res}).catch(err=>{console.log(err)});
console.log(data.data.slot)
return data.data.slot;
}

export async function deleteParking(PlateNum){
    let json=JSON.stringify({
        "PlateNum": `"${PlateNum}"`
      })
    const data= await axios.post("http://localhost:5000/parking/out",json, {
    headers: {
        'Content-Type': 'application/json'
    }
}).then(res=>{return res}).catch(err=>{console.log(err)});
}