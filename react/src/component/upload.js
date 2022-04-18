import axios from 'axios';
import { useContext, useState } from 'react';

function Upload(){
    const [pname,setPname]=useState("");
    const [ptitle,setPtitle]=useState("");
    const [pdesc,setPdesc]=useState("");
    // const {mon,setMov}=useContext(Con);

    function submit(){
        const data=new FormData();
        data.append('pname',pname);
        data.append('ptitle',ptitle);
        data.append('pdesc',pdesc);
        axios.post('http://localhost:5000/gallery',data)
        .then(res=> console.log('uploaded'))
        setPdesc("");
            setPname("");
            setPtitle("");
        console.log(pname)
    }
    return(
        <>
        <div className="container mx-auto md:px-96 mt-96 p-72" id='upd' name="upd">
            <h1 className="font-bold text-3xl text-center">UPLOAD YOUR PIC</h1>
            <div className="md:mx-36 grid grid-cols place-content-center my-12 inline bg-indigo-400 p-8 ">
            <input onChange={(e)=>{setPname(e.target.files[0])}} type="file" accept="image/*"/>
            {/* <input onChange={(e)=>{setPname(e.target.value)}} value={pname} type="text"/>  */}
            <input className="border-solid border-2 border-indigo-600 bg-red-200 my-4" onChange={(e)=>{setPtitle(e.target.value)}}  type="text" value={ptitle} placeholder="enter title" name="input"/>
            <textarea className="border-solid border-2 border-indigo-600 bg-red-200 my-4" onChange={(e)=>{setPdesc(e.target.value)}} value={pdesc} placeholder="enter desc"/>
            <button className="max-auto bg-red-500 font-bold px-8 py-2" onClick={submit}>upload</button>
            </div>
        </div>
        </>
    )
}
export default Upload;