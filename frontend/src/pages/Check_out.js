import React  ,{ useEffect, useState }from 'react'
import {Link} from 'react-router-dom';
import jsPDF from 'jspdf'
import axios from 'axios';
import requests from '../requests';

export const Check_out = () => {
  const [plateNum, setPlate] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
      
  let handleSubmit = async (e) => {
    e.preventDefault();
    async function fetchdata(){
      let json=JSON.stringify({
        "PlateNum": `${plateNum}`
      })
     const data= await axios.post(requests.park_out,json, {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
      }).then(res=>{return res}).catch(err=>{console.log(err);return err});
      console.log(data.data)
      setMessage(data.data.doc)
  }
  fetchdata();
  };
   function jsPdfgenerator(data){
    console.log(message);
    var doc =new jsPDF('landscape','px','a4','false');
    doc.setProperties({
      title: 'Autonomus Parking system',
      subject: `subject`,
      author: '',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'MEEE'
    })
    doc.setFontSize(22);
    doc.setFont("courier");
    doc.text(20,90,`Platenumber: ${message.PlateNum}`)
    doc.text(20,120,`Entry: ${message.Entry}`)
    doc.text(20,150,`Exit: ${message.Exit}`)
    doc.text(20,180,`Slot: ${message.Slot}`)
    doc.text(20,210,`You have to pay : ${message.fare}$ USD`)
    doc.save("invoice.pdf")
    console.log("hit");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={plateNum}
      placeholder="PlateNum"
      onChange={(e) => setPlate(e.target.value)}
    />
    <button type="submit">Send</button>
  </form>
  <form onSubmit={jsPdfgenerator}>
  <div className="pdf">
      <button type="submit" >Calculate fare</button>
      </div>
  </form>
  <Link to="/check_in">check_in </Link>
  </div>
  )
}
