import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { noteObj } from "./App";
import { tags } from "./App";

type CreateProps = {
  setTagArray: React.Dispatch<React.SetStateAction<tags[]>>;
  setPostArray: React.Dispatch<React.SetStateAction<noteObj[]>>;
  tagArray: tags[];
};

let render = 0;
function Create({ setPostArray, setTagArray, tagArray }: CreateProps) {
  render++;
  const id: string = uuidV4();
  // const inputRef = useRef({
  //   title:'',
  //   description:'',
  // })
  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();
  const [localTagArray, setLocalTagArray] = useState<tags[]>([]);

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); //* we need to prevent this form on submitting
      if(tagInputRef.current && tagInputRef.current.value!=""){  //* This if not included will give ts errors
        const tagObj = {
          id: Math.random().toString(),
          name: tagInputRef.current.value,
        };
        // setTags(e=>[...e,tagObj])
        setLocalTagArray((e) => [...e, tagObj] as tags[]);
        tagInputRef.current.value = ""
      }
    }
  };

  const deleteTag = (id: string) => {
    const remove = localTagArray.filter((e) => e.id !== id);
    setLocalTagArray(remove);
  };

  const removeAllTags = () => {
    setLocalTagArray([]);
  };

  const onChangeEveneOnTagsDropDown = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;

    // Check if the selectedValue is already in localTagArray
    const isValueUnique = !localTagArray.some(
      (tag) => tag.name === selectedValue
    );

    if (isValueUnique) {
      setLocalTagArray((prevTags) => [
        ...prevTags,
        { name: selectedValue, id: uuidV4() },
      ]);
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

      const notesObj: noteObj = {
        title: titleInputRef.current?.value,
      body: textareaRef.current?.value,
      id: id,
      tags: localTagArray,
    };
    setTagArray(notesObj.tags);
    setPostArray((e) => [...e, notesObj]);
    navigate("/");
  };

  const showRefreshAlert = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };
  useEffect(() => {
    console.log(render);
  });

  useEffect(() => {
    window.addEventListener("beforeunload", showRefreshAlert);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", showRefreshAlert);
    };
  }, []);
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">title</label>
        <input
          required={true}
          type="text"
          name="title"
          id="title"
          ref={titleInputRef}
        />
        <br />
        <label htmlFor="tags">Tags</label>
        <div style={{ border: "2px solid white", width: "40%" }}>
          <div>
            {localTagArray?.map((e) => (
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
            ref={tagInputRef}
            name="tag"
            onKeyDown={enterKeyHandler}
          />
        </div>
        <br />
        <div>
          <br />
          <label>Choose from Global tags</label>
          <br />
          <select
            name="globalTags"
            id="globalTags"
            onChange={onChangeEveneOnTagsDropDown}
          >
            {tagArray.map((e, i) => (
              <option key={i} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          ref={textareaRef}
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
