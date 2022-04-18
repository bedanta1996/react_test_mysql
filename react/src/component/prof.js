import { useContext, useState,useEffect } from "react";
import { Con,Uname } from "../Cont";
import axios from "axios";



function Prof(){
const{login,setLogin}=useContext(Uname);
  const {navi,setNavi}=useContext(Con);
 const [user,setUserprofile]=useState([])
  const [ info,setInfo]=useState([]);

useEffect(()=>{
    axios.get('http://localhost:5000/user')
    .then(res=>{
        if (res.data) {
            setUserprofile(res.data[0].name)
            console.log(res.data)
          }
    }); 
  },[])
    return(
        <>
        <div className="container grid place-content-center mt-52  pt-24 h-24">
        <div className="mt-24">
        <h1 className="font-bold text-3xl text-center">hiii</h1>
        <h2 className="font-bold text-4xl text-center">welcome {user}</h2>
        </div>
        </div>
        </>
    )
}
export default Prof;