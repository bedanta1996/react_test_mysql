
import { Link } from "react-scroll";
function Dommav(){ //since react scrool down allow to jump into other page i.e why we made a separate for link 
    return(
        <>
      <button className="font-bold text-xl text-white bg-yellow-500 rounded-md px-8 py-2"> <Link  to='upd' smooth={true} offset={50} duration={1000}>upload</Link></button>
      <button className="font-bold text-xl text-white bg-blue-500 rounded-md px-8 py-2"><Link   to='gal' smooth={true} offset={50} duration={1000}>gallery</Link></button>
        </>
        )
}
export default Dommav;