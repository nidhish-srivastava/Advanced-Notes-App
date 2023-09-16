import { Link } from "react-router-dom";
import { noteObj } from "./App";
import { useState } from "react";

type HomeProps = {
  postArray: noteObj[];
  setPostArray: React.Dispatch<React.SetStateAction<noteObj[]>>;
};

function Home({ postArray, setPostArray }: HomeProps) {
  const [input, setInput] = useState("");
  const [inputForTag, setInputForTag] = useState("");
  const [toggle,setToggle] = useState(false)
  const [newAr,setNewAr] = useState<noteObj[]>([])

  //* Since we are adding two search functionalietes,now we need to create a state so that we can set the state
  const filteredResults = postArray.filter((e) =>
    e.title.toLowerCase().includes(input.toLowerCase())
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
      {/* <button onClick={filterBasedOnTags}>Search</button>
      //* We also created a new array where we were storing the new results then rendering it based on map method
      //* FINALLY THE PORBLEM IS SOLVED
      //* WE CREATED THE LOGIC OF SEARCHING BASED ON TAGS BUT WERE NOT ABLE TO IMPLEMENT IT ON EVRY KEY STROKE
      //* WE MANAGED TO DO BASED ON onCLick event where we triggered our function
      //* using e.target.value inside onChange with help of length(with ternary operatores,we aachieved our functionality)
      */}
    </div>
  );
}

export default Home;
