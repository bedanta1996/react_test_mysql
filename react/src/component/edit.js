import axios from 'axios';
import { useState,useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function Edit(){
    let his=useHistory();
    const{id}=useParams();
    const [pname,setPname]=useState("");
    const [ptitle,setPtitle]=useState("");
    const [pdesc,setPdesc]=useState("");
    const [display,setDisplay]=useState([]);

    function submit(){
        
        axios.post(`http://localhost:5000/edit/${id}`,
        { 
            pname:pname,
            ptitle:ptitle,
            pdesc:pdesc
            
        }).then(()=>{
            setPdesc("");
            setPname("");
            setPtitle("");
        })
        setPdesc("");
            setPname("");
            setPtitle("");
        console.log(pname)
        his.goBack();
    }
    useEffect(()=>{
        axios.get(`http://localhost:5000/edit/${id}`)   //taking parameter to display a certain element data
        .then(res=>setDisplay(res.data));            //in axios does need to json format and the response should be  res.data 
    },)

    return(
        <>
        { display.map(display=>{
        return(
        <>
            <h1 className="font-bold text-3xl text-center">UPdate your pic {id}</h1>
            <div className="md:mx-36 grid grid-cols place-content-center my-12 inline bg-indigo-400 p-8 ">
            <input  value={display?display.name:''} onChange={(e)=>{setPname(e.target.value)}} type="text"/> 
            <input className="border-solid border-2 border-indigo-600 bg-red-200 my-4" onChange={(e)=>{setPtitle(e.target.value)}}   defaultValue={display.title} type="text"  name="input"/>
            <textarea className="border-solid border-2 border-indigo-600 bg-red-200 my-4" onChange={(e)=>{setPdesc(e.target.value)}}   defaultValue={display.description} />
            <button className="max-auto bg-red-500 font-bold px-8 py-2" onClick={submit} >Update</button>
            </div>
            </>
        )
        }
        )}
        </>
    )
    
}
export default Edit;