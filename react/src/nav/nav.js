import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dommav from "./domnav";
import axios from "axios";
import { Con, Uname,View } from "../Cont";
function Nav(prop){
    // const {val}=prop;
    const {see,setSee}=useContext(View);
    const {navi,setNavi}=useContext(Con);
    const[nav,setNv]=useState(false);
    // const{login,setLogin}=useContext(Uname);
    function go(){
        setNv(!nav)
    }
   function navview(){
       setSee(true)
   }
   function navnot(){
      setSee(false)
   }
   function logout(){
       axios.get('http://localhost:5000/logout')
       .then(res=>{
          res.data.logout?window.localStorage.removeItem('user_key'): console.log(res.data.text);
          setNavi(false);
       })
   }
    return(
        <>
        <div className="container sticky top-0 z-30 bg-blue-200 flex place-content-end p-4">
        <div className="hidden md:grid grid-rows md:grid-cols-7 gap-4">
        <Link className="font-bold text-xl text-white bg-blue-500 rounded-md px-8 py-2" onClick={navnot} to='/'>HOME</Link>
        {!navi &&<Link className="font-bold text-xl text-white bg-pink-500 rounded-md px-8 py-2" onClick={navview} to='/reg'>LOGIN</Link>}
         {navi?<Link className="font-bold text-xl text-white bg-blue-500 rounded-md" onClick={logout} to=''>logout</Link>:<></>}
         {/* {navi?<Link className="font-bold text-xl text-white bg-blue-500 "  to=''>{login}</Link>:<></>} */}
         {navi?<Link className="font-bold text-xl text-white bg-green-500 rounded-md"  to='/prof'>profile</Link>:<></>}
       {!see && <Dommav/>}
        </div>
        <div className="md:hidden">
            {
            nav? <button className="p-3 bg-red-200 font-bold text-2xl" onClick={go}>x</button> :<button className="p-3 bg-red-200 font-bold text-2xl" onClick={go}>=</button>
          }
        </div>
        <div className={nav?' md:hidden grid grid-cols mt-24 w-24':'hidden'}>
        <Link className="font-bold text-xl text-white bg-blue-500" to='/'>start</Link>
        <Link className="font-bold text-xl text-white bg-yellow-500 " to='upd' smooth={true} offset={50} duration={1000}>upload</Link>
        <Link className="font-bold text-xl text-white bg-blue-500 "  to='/home'>gallery</Link>
        </div>
        </div>
        </>
    )
}
export default Nav;