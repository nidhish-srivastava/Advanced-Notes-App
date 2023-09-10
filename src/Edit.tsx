import { useNavigate, useParams } from "react-router-dom"
import { noteObj } from "./App"
import { useState } from "react"

type EditType = {
    postObj : noteObj
    postArray : noteObj[]
    setPostArray : React.Dispatch<React.SetStateAction<noteObj[]>>
}

function Edit({postObj,postArray,setPostArray} : EditType) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [body,setBody] = useState(postObj?.body)
    const [title,setTitle] = useState(postObj?.title)
    const saveHandler = () =>{
        setPostArray(
            postArray?.map((e)=>{
                if(e.id==id){
                    return {...e,title : title,body : body}
                }
                return e
            })
        )
        navigate('/')
        // const fsdf = postArray?.filter((e)=>e.id==id)
        // console.log(fsdf);
    }
  return (
    <div>
        <input type="text" value={body} onChange={e=>setBody(e.target.value)} />
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} />
        <button onClick={saveHandler}>Save</button>
    </div>
  )
}

export default Edit