import { useNavigate, useParams } from "react-router-dom";
import { noteObj } from "./App";
// import { useState } from "react";

type EditType = {
  postObj?: noteObj;
  postArray: noteObj[];
  setPostArray: React.Dispatch<React.SetStateAction<noteObj[]>>;
};

// function Edit({ postObj, postArray, setPostArray }: EditType) {
  // const { id } = useParams();
//   const navigate = useNavigate();
//   // const [body,setBody] = useState(postObj.body)
//   // const [title,setTitle] = useState(postObj.title)
//   const [body, setBody] = useState<string | undefined>(postObj?.body || "");
//   const [title, setTitle] = useState<string | undefined>(postObj?.title || "");
//   const saveHandler = () => {
//     setPostArray(
//       postArray?.map((e) => {
//         if (e.id == id) {
//           // return {...e,title : title,body : body}
//           return { ...e, title: title || "", body: body || "" };
//         }
//         return e;
//       })
//     );
//     navigate("/");
//   };
//   return (
//     <div>
//       <input
//         type="text"
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//       />
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <button onClick={saveHandler}>Save</button>
//     </div>
//   );
// }

// export default Edit;


import { useEffect, useRef } from "react";

// ...

function Edit({ postObj, postArray, setPostArray }: EditType) {
  const { id } = useParams();
  const navigate = useNavigate();
  const bodyRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Set the initial values when postObj changes
    if (postObj && bodyRef.current && titleRef.current) {
      bodyRef.current.value = postObj.body || "";
      titleRef.current.value = postObj.title || "";
    }
  }, [postObj]);

  const saveHandler = () => {
    setPostArray(
      postArray?.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            title: titleRef.current?.value || "",
            body: bodyRef.current?.value || "",
          };
        }
        return e;
      })
    );
    navigate("/");
  };

  return (
    <div>
      <input
        id="bodyInput"
        type="text"
        ref={bodyRef}
      />
      <input
        id="titleInput"
        type="text"
        ref={titleRef}
      />
      <button onClick={saveHandler}>Save</button>
    </div>
  );
}

export default Edit;
