import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div>
        <Link to={`/new`}>
          <button>Create</button>
        </Link>
        <button>Edit Tags</button> {/*Ek modal bn ke aaega */}
      </div>
    </div>
  );
}

export default Navbar;
