import { useNavigate, useParams } from "react-router-dom";
import { noteObj } from "./App";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type NoteType = {
  postArray: noteObj[];
  setPostArray: React.Dispatch<React.SetStateAction<noteObj[]>>;
  setPostObj: React.Dispatch<React.SetStateAction<noteObj | undefined>>;
};



function Note({ postArray, setPostArray, setPostObj }: NoteType) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const find = () => {
    const find = postArray.findIndex((e) => e.id == id);
    console.log(find);
    setIndex(find);
  };

  useEffect(() => {
    find();
  }, []);

  let arrayIndex = postArray[index];

  const openEdit = () => {
    //   console.log(postArray[index]);
    setPostObj(postArray[index]);
    navigate(`/${id}/edit`);
  };

  const deleteNoteFromArray = () => {
    const removeNote = postArray.filter((e) => e.id !== id);
    setPostArray(removeNote);
    navigate("/");
  };

  return (
    <>
      <button onClick={openEdit}>Edit</button>
      <button onClick={deleteNoteFromArray}>Delete</button>
      <Link to={`/`}>
        <button>Back</button>
      </Link>
      <div>
        Title: {arrayIndex.title}
        <br />
        {arrayIndex.body}
        <br />
        <div>
          {arrayIndex.tags.map((e) => (
            <button>{e.name}</button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Note;
