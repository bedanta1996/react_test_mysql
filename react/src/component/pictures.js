import { useState } from "react";
import Edit from "./edit";
import axios from "axios";
import { Link } from "react-router-dom";


function Card(prop){
    const [val,setVal]=useState('');
    // function edit(did){
    //     setVal(did)
    // }
    function del(did){
        axios.get(`http://localhost:5000/del/${did}`).then(()=>console.log('deleted'))
    }
    // const img=window.location.origin+`/pic/${info.name}`
    const{info}=prop;
    return(
        <>
         <div className="bg-pink-400 ">
            <img className="max-h-full max-w-full" src={`./images/${info.name}`} alt="hh"/>
            <h2 className="font-bold text-center my-2">{info.title}</h2>
            <p className="text-center my-2">{info.description}</p>
            <div className="my-2 grid justify-items-stretch gap-2">
          <Link to={`/edit/${info.id}`}> <button className="bg-green-500 rounded-full mx-12 text-center px-24 py-4 ">Edit</button></Link>
            <button className="bg-red-500 rounded-full px-8 py-4" onClick={()=>del(info.id)}>delete</button>
            </div>
            </div>
        </>
    )
}
export default Card;