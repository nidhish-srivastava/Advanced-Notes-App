import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from './Home'
import Create, { tags } from './Create'
import { useState } from 'react'
import Note from './Note'
import Edit from './Edit'

export type noteObj = {
  id : string,
  title : string,
  tags : tags[]
  body : string
}

function App() {
  const [postArray,setPostArray] = useState<noteObj[]>([])
  const [postObj, setPostObj] = useState<noteObj | null>()
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home postArray = {postArray} />} />
      <Route path='/new' element = {<Create setPostArray={setPostArray} postArray = {postArray} />} />
      <Route path='/:id' element = {<Note setPostArray={setPostArray} setPostObj={setPostObj} postArray={postArray}/>} />
      <Route path='/:id/edit' element = {<Edit postObj={postObj} setPostArray={setPostArray} postArray={postArray}/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App