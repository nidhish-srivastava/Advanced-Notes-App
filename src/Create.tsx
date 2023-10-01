import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { noteObj } from "./App";
import { tags } from "./App";

type CreateProps = {
  setTagArray : React.Dispatch<React.SetStateAction<tags[]>>
  postArray: noteObj[];
  setPostArray: React.Dispatch<React.SetStateAction<noteObj[]>>;
};

function Create({ setPostArray, postArray,setTagArray }: CreateProps) {
  const id: string = uuidV4();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [body, setBody] = useState("");
  const [dropdownTagSelect,setDropDownSelectTag] = useState("")
  const [localTagArray, setLocalTagArray] = useState<tags[]>([]);
  // const [localTagArray, setLocalTagArray] = useLocalStorage<tags[]>("TAGS",[]);

  const enterKeyHandler = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault(); //* we need to prevent this form on submitting
      const tagObj = {
        id: Math.random().toString(),
        name: tag,
      };
      // setTags(e=>[...e,tagObj])
      setLocalTagArray((e) => [...e, tagObj]);
      setTag("");
    }
  };

  const deleteTag = (id: string) => {
    const remove = localTagArray.filter((e) => e.id !== id);
    setLocalTagArray(remove);
  };

  const removeAllTags = () => {
    setLocalTagArray([]);
  };

  const onChangeEveneOnTagsDropDown = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    setDropDownSelectTag(e.target.value)
    let input = e.target.value
    setLocalTagArray(e=>[...e,{name : input,id : uuidV4()}])
  }

  const submitHandler = (e: any) => {
    e.preventDefault();
    const notesObj = {
      title: title,
      body: body,
      id: id,
      tags: localTagArray,
    }
    setTagArray(notesObj.tags)
    setPostArray((e) => [...e, notesObj]);
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="tags">Tags</label>
        <div style={{ border: "2px solid white", width: "40%" }}>
          <div>
            {localTagArray.map((e) => (
              <button style={{ margin: "1rem" }} type="button">
                {e.name}
                <span
                  style={{
                    marginLeft: "1rem",
                    background: "white",
                    color: "black",
                  }}
                  onClick={() => deleteTag(e.id)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </button>
            ))}
            <span onClick={removeAllTags}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <span>Press enter to insert tag</span>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={enterKeyHandler}
          />
        </div>
        {tag}
        <br />
        <div>
          {postArray.map((e) => {
            return (
              <select value={dropdownTagSelect} onChange={onChangeEveneOnTagsDropDown}>
                <option value="">{" "}</option>
                {e.tags.map((e) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            );
          })}
        </div>
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          cols={30}
          rows={10}
        ></textarea>
        <button type="submit">Save</button>
      </form>
      <Link to={`/`}>Cancel</Link>
    </div>
  );
}

export default Create;
