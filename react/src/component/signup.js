import { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Con } from "../Cont";

function Signup(){
    const [pname,setPname]=useState("");
    const [password,setPassword]=useState("");
    const [err,setPError]=useState("");
    const [log,setLog]=useState("");
    const {navi,setNvi}=useContext(Con)

    function submit(){
        const data=new FormData();
        data.append('name',pname);
        data.append('password',password);
        axios.post('http://localhost:5000/signup',data)
        .then(res=>{
            res.data.message? setPError(res.data.message):setPError('thnc')} );
             setPname("");
             setPassword("");
        
    }
    return(
        <>
        <div className="container mx-auto px-24 mt-24" name="sign">
            <div className="p-4 md:p-12 md:mx-96 bg-pink-200">
                <h2 className="text-xl font-bold text-center">SIGN</h2>
                <h3 className="my-2 text-red bg-white-500 text-xl font-bold">{err}</h3>
            <div className="grid grid-cols text-center">
                <label className="mt-12" >Username</label>
                <input className="h-12 text-xl" value={pname} type='text' placeholder="username" onChange={(e)=>{setPname(e.target.value)}} required></input>
                <label className="mt-12">password</label>
                <input className="h-12 text-xl" type='password'value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" required></input>
                <button className="px-8 py-6 bg-green-400 mt-12 rounded-md" onClick={submit}>Signup</button>
            </div>
            </div>
        </div>
        </>
    )
}
export default Signup;