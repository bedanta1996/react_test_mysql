import { useContext, useState,useEffect } from "react";
import { Link } from "react-scroll";
import { Con } from "../Cont";
import Home from "./home";
import Upload from "./upload";



function Land(){
  const {navi,setNavi}=useContext(Con);
 const [hi,setHi]=useState("")
  const [ pp,setP]=useState(false);
    return(
        <>
        <div className="container grid place-content-center mt-52  pt-24 h-24">
        <div className="mt-24">
        <h1 className="font-bold text-3xl text-center">Click here!</h1>
      <Link to='log' smooth={true} offset={50} duration={1000} ><button className="transition hover:bg-indigo-500  bg-blue-200 animate-bounce px-24 py-16 rounded-lg my-14 ">GET START</button></Link>
        </div>
        </div>
        <Upload/>
        <Home/>
        {/* {!navi?<Login/>:<></>}
        {!navi?<Signup/>:<></>} */}
        </>
    )
}
export default Land;