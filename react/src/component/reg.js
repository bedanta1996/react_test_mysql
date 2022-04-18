import { useState } from 'react';
import {BrowserRouter,Switch,Route, Link} from 'react-router-dom'
// import Upload from "./component/upload";
import Login from './login';
import Signup from './signup';


function Reg() {
  const [iflog,setLog]=useState(false);
  function tap(){
    setLog(!iflog)
  }

  return (
    <>
    <div className='container mt-8 mx-auto'>
    <h1 className='text-center font-bold text-2xl'>select</h1>
    <div className='text-center mx-auto gap-6 my-3'>
    <button className="font-bold text-xl text-white bg-blue-500 rounded-md px-8 py-2" onClick={tap}>{!iflog?'sign up':'login'}</button>
    {iflog?<Signup/>:<Login/> }
    </div>
    </div>
    </>
  );
}

export default Reg;