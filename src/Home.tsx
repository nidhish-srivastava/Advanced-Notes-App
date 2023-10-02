import { Link } from "react-router-dom";
import { noteObj } from "./App";
import { useState } from "react";
// import Modal from "./Modal";

type HomeProps = {
  postArray: noteObj[];
};

function Home({ postArray}: HomeProps) {
  const [input, setInput] = useState("");
  const [inputForTag, setInputForTag] = useState("");
  const [toggle,setToggle] = useState(false)
  const [newAr,setNewAr] = useState<noteObj[]>([])

  //* Since we are adding two search functionalietes,now we need to create a state so that we can set the state
  const filteredResults = postArray.filter((e) =>
    e.title?.toLowerCase().includes(input.toLowerCase())
  );

  //* WE have created this functionality but problem is coming when we override,shit is getting real 
  const filterBasedOnTags = () =>{
    const results : noteObj[] = []; 
    for (const item of postArray) {
      for (const tag of item.tags) {
      if (tag.name.includes(inputForTag)) {
        results.push(item);
        break; // Break out of the inner loop when a match is found
      }
    }
  }
  console.log(results);
  setNewAr(results)
  setToggle(true)
}


  return (
    <div>
      <input
        type="search"
        placeholder="title"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="search"
        placeholder="tag"
        value={inputForTag}
        onChange={e=>{
          if(e.target.value=="") setToggle(false)
          if(e.target.value.length > 1){
            filterBasedOnTags()
            setToggle(true) 
          } 
          setInputForTag(e.target.value)
        }
      }
      />
      {!toggle ? filteredResults.map((e) => (
        <Link to={`/${e.id}`}>
          <div  style={{border : "2px solid white",width :"fit-content",padding : "2rem",marginTop : "1rem"}}>
            <h2>{e.title}</h2>
            <div>
              <h2>
                {e.tags.map((e) => (
                  <button style={{ marginLeft: "1rem" }}>{e.name}</button>
                ))}
              </h2>
            </div>
          </div>
        </Link>
      ))
      : (
        newAr.map((e) => (
          <Link to={`/${e.id}`}>
            <div>
              <h2>{e.title}</h2>
              <div>
                <h2>
                  {e.tags.map((e) => (
                    <button style={{ marginLeft: "1rem" }}>{e.name}</button>
                  ))}
                </h2>
              </div>
            </div>
          </Link>
        ))
      )
      }
    </div>
  );
}

export default Home;


// const ModalParent: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={openModal}>Open Modal</button>
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <h2>Modal Content</h2>
//         <p>This is the content of the modal.</p>
//       </Modal>
//     </div>
//   );
// };

