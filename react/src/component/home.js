import Card from "./pictures";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Con } from "../Cont";

function Home(){
    const [display,setDisplay]=useState([]);
    const {navi,setNavi}=useContext(Con)
    useEffect(()=>{
        axios.get('http://localhost:5000/display')
        .then(res=>{
            setDisplay(res.data)});            //in axios does need to json format and the response should be  res.data 
    },[display])
    return(
        <>
        <div className=" container mx-auto  mt-24 pt-56 px-14" name="gal">
         <h1 className="font-bold text-2xl">GALLERY no</h1>
        <div className="grid grid-cols md:grid-cols-4 gap-9">
            {
                display.map(data=><Card info={data}/>)
            }
        </div>
        </div>
        </>
    )
}
export default Home;