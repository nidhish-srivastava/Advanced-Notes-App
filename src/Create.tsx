import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { PostArray } from "./App"
import { v4 as uuidV4 } from "uuid"


type CreateProps = {
    postArray : PostArray[]
    setPostArray : React.Dispatch<React.SetStateAction<PostArray[]>>
}

export type tags = {
    id : string
    name : string
}

function Create({setPostArray}: CreateProps) {
    const id: string = uuidV4();
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [tags,setTags] = useState<tags[]>([])
    const [tag,setTag] = useState("")
    const [body,setBody] = useState("")

    
    const enterKeyHandler = (e : any) =>{
        if(e.key === "Enter"){
            e.preventDefault()  //* we need to prevent this form on submitting
            const tagObj = {
                id : Math.random().toString(),
                name : tag
            }
            setTags(e=>[...e,tagObj])
            setTag("")
        }
    }

    const deleteTag = (id : string) =>{
        const remove = tags.filter(e=>e.id!==id)
        setTags(remove)
    }

    const removeAllTags = () =>{
        setTags([])
    }

    const submitHandler = (e : any) =>{
        e.preventDefault()
        const notesObj = {
            title : title,  
            body : body,
            id : id,
            tags : tags
        }
        setPostArray(e=>[...e,notesObj])
        navigate('/')
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
            <label htmlFor="title">title</label>
            <input type="text" name="title" id="title" value={title} onChange={e=>setTitle(e.target.value)} />
            <label htmlFor="tags">Tags</label>
            <div style={{border : "2px solid white",width : "40%"}}>
                <div>
                {tags.map((e)=>(
                    <button  style={{margin : "1rem"}} type="button">{e.name} 
                    <span  style={{marginLeft : "1rem",background : "white",color : "black"}} onClick={()=>deleteTag(e.id)} >
                    <i className="fa-solid fa-xmark"></i>
                    </span>
                    </button>
                ))}
                  <span onClick={removeAllTags}>
                    <i className="fa-solid fa-xmark"></i>
                    </span>
                </div>
            <input type="text" value={tag} onChange={e=>setTag(e.target.value)} onKeyDown={enterKeyHandler} />
            </div>
                {tag}
                <br />
                <select>
                {tags.map(e=>(
                    <option>{e.name}</option>
                    ))}
                    </select>
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"value={body} onChange={e=>setBody(e.target.value)}  cols={30} rows={10}></textarea>
        <button type="submit">
        Save
        </button>
        </form>
        <Link to={`/`}>Cancel</Link>
    </div>
  )
}

export default Create