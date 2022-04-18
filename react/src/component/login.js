import {useContext, useState} from 'react';
import axios from "axios";
import { useEffect } from 'react';
import { Con } from '../Cont';
import { useHistory } from 'react-router-dom';
function Login(){
    const {navi,setNavi}=useContext(Con);
    axios.defaults.withCredentials = true;
    const [pname,setPname]=useState("");
    const [password,setPassword]=useState("");
    const [err,setPError]=useState("");
    const[login,setLogin]=useState("");
 const his=useHistory()
    function submit(){
        const data=new FormData();
        data.append('name',pname);
        data.append('password',password);
        // data.append('pdesc',pdesc);
        axios.post('http://localhost:5000/login',data,{
            withCredentials: true, // Now this is was the missing piece in the client side 
          })
        .then(res=>{
            res.data.text? setPError(res.data.text):setPError('you have logged in')
            window.localStorage.setItem('user_key',JSON.stringify(res.data.result[0].name))
            setNavi(!navi)
            console.log(res.data.result[0].name)
            his.push('/prof')
           } );
        // // setPdesc("");
             setPname("");
             setPassword("");
        // console.log(pname)
    }
    return(
        <>
        <div className="container mx-auto px-24  mt-4" name="log">
            <div className="p-4 md:p-12 md:mx-96 md:mt-24 bg-green-200">
                <h2 className="text-xl font-bold text-center">LOGIN </h2>
            <div className="grid grid-cols text-center">
                <label className="mt-12" >Username</label>
                <input className="h-12 text-xl" type='text' placeholder="username" onChange={(e)=>{setPname(e.target.value)}} required></input>
                <label className="mt-12">password</label>
                <input className="h-12 text-xl" type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" required></input>
                <button className="px-8 py-6 bg-pink-400 mt-12 rounded-md" onClick={submit}>log in</button>
            </div>
            <h3>{err}</h3>
            <h4>{login}</h4>
            </div>
        </div>
        </>
    )
}
export default Login;