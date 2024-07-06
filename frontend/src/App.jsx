import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import IssueBook from './pages/IssueBook'
import IssuedBooks from './pages/IssuedBooks'
import IssuedBookUser from './pages/IssuedBookUser'
import ReturnBook from './pages/ReturnBook'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/issue/:id' element={<IssueBook/>}/>
      <Route path='/issuedBooks' element={<IssuedBooks/>}/>
      <Route path='/issuedBooks/:id' element={<IssuedBookUser/>}/>
      <Route path='/returnBook/:id' element={<ReturnBook/>}/>
    </Routes>
  )
}

export default App
