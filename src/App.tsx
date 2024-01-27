import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from './Home'
import Create  from './Create'
import { useState } from 'react'
import Note from './Note'
import Edit from './Edit'
import Navbar from './Navbar'
import { useLocalStorage } from './useLocalStorage'

export type noteObj = {
  id : string,
  title ?: string,
  tags : tags[]
  body ?: string
}

export type tags = {
  id : string
  name : string
}


function App() {
  const [postArray,setPostArray] = useLocalStorage<noteObj[]>("NOTES",[])
  const [postObj, setPostObj] = useState<noteObj>()
  const [tagArray, setTagArray] = useLocalStorage<tags[]>("TAGS",[]);
  return (
    <BrowserRouter>
    <Navbar tagArray = {tagArray}/>
    <Routes>
      <Route path='/' element = {<Home  postArray={postArray}/>} />
      <Route path='/new' element = {<Create tagArray={tagArray} setTagArray = {setTagArray}  setPostArray={setPostArray} />} />
      <Route path='/:id' element = {<Note setPostArray={setPostArray} setPostObj={setPostObj} postArray={postArray}/>} />
      <Route path='/:id/edit' element = {<Edit postObj={postObj} setPostArray={setPostArray} postArray={postArray}/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App