import { Link } from "react-router-dom";
import { tags } from "./App";
import { useState } from "react";

function Navbar({tagArray} : {tagArray : tags[]}) {
  const [show,setShow] = useState(false)
  return (
      <header className="header">
        <Link to={`/`}>
        Home
        </Link>
        <Link to={`/new`}>
          Create
        </Link>
        <button onClick={()=>setShow(e=>!e)}>Edit Tags</button>
        {show ? tagArray.map(e=>(
          <option value="">{e.name}</option>
          )) : null}
    </header>
  );
}

export default Navbar;
