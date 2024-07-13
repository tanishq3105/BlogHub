
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import {Signup} from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { CreateBlog } from './pages/CreateBlog';
import {  Userblogs } from './pages/Userblogs';
import { Landing } from './pages/Landing';
import { Update } from './pages/Update';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/blog/:id' element={<Blog/>}></Route>
        <Route path='/blogs' element={<Blogs/>}></Route>
        <Route path='/create' element={<CreateBlog/>}></Route>
        <Route path='/userblogs/:id' element={<Userblogs/>}/>
        <Route path='/update/:id' element={<Update/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
