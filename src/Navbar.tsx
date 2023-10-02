import { Link } from "react-router-dom";
import { tags } from "./App";
import { useState } from "react";
import Modal from "./Modal";

function Navbar({tagArray} : {tagArray : tags[]}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
      <header className="header">
        <Link to={`/`}>
        Home
        </Link>
        <Link to={`/new`}>
          Create
        </Link>
        <div>
      <button onClick={openModal}>Edit Tags</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {tagArray.map(e=>(
          <option value="">{e.name}</option>
          ))}
      </Modal>
    </div>
    </header>
  );
}

export default Navbar;
