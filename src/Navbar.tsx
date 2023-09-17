import { Link } from "react-router-dom";
import { tags } from "./App";
import { useState } from "react";

function Navbar({tagArray} : {tagArray : tags[]}) {
  const [show,setShow] = useState(false)
  return (
    <div>
      <div>
        <Link to={`/new`}>
          <button>Create</button>
        </Link>
        <button onClick={()=>setShow(e=>!e)}>Edit Tags</button> {/*Ek modal bn ke aaega */}
        {show ? tagArray.map(e=>(
          <option value="">{e.name}</option>
          )) : null}
      </div>
    </div>
  );
}

export default Navbar;
