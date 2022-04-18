import Home from "./component/home";
import Land from "./component/Land";
import Nav from "./nav/nav";
import Login from "./component/login";
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Upload from "./component/upload";
// import Login from "./component/login";
import Reg from "./component/reg";
import Edit from "./component/edit";
import { createContext, useEffect, useState } from "react";
import { Con, Uname,View } from "./Cont";
import axios from "axios";
import Signup from "./component/signup";
import Prof from "./component/prof";

function App() {
  const [navi,setNavi]=useState(false);  
  const [login,setLogin]=useState([]);
  const [see,setSee]=useState(false);
  
useEffect(()=>{
  const auth= window.localStorage.getItem('user_key')
  if(auth){
    setNavi(true)
  }else{
    setNavi(false)
  }
},[])
useEffect(()=>{
  axios.get('http://localhost:5000/')
  .then(res=>{
      if (res.data.loggedin) {
          setLogin(res.data.user[0].name)
        }
  }); 
},[navi])
  return (
    <>
    <BrowserRouter>
    <View.Provider value={{see,setSee}}>
    <Con.Provider value={{navi,setNavi}}>
      <Uname.Provider value={{login,setLogin}}>
    <Nav/>
    <Switch>
      <Route path='/' component={Land} exact/>
      {!navi?<Route path='/reg' component={Reg} exact/>:<Route path='/reg' component={Land} exact/>}
      <Route path='/login' component={Login} exact/>
      <Route path='/sign' component={Signup} exact/>
      {navi? <Route path='/prof' component={Prof} exact/>: <Route path='/prof' component={Land} exact/>}
      {/* <Route path='/home' component={Home} exact/> */}
      <Route path='/edit/:id' component={Edit} exact/>
    </Switch>
    </Uname.Provider>
    </Con.Provider>
    </View.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
