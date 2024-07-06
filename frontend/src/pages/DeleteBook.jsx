import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  const navigate = useNavigate();

  const handleDeleteBook = () =>{
    setLoading(true)
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(()=>{
      setLoading(false)
      navigate('/')
    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  }

  return (
    <div className='p-4'>
      <div><BackButton/></div>
      <h1 className='text-2xl font-bold mb-4 text-center'>Delete Book</h1>
      <div className='flex flex-col border-2 border-red-400 rounded-xl w-[600px] mx-auto p-4'>
      <p className='text-center py-4'>Are you sure you want to delete this book?</p>
      <div className='flex'>

      <button
        onClick={handleDeleteBook}
        className='bg-red-400 text-white py-2 mx-2 w-full rounded-md hover:bg-red-500 transition-all duration-300 ease-in-out my-4'
        >Yes</button>
        <button className='bg-red-400 text-white py-2 mx-2 w-full rounded-md hover:bg-red-500 transition-all duration-300 ease-in-out my-4'
        onClick={()=>{
          navigate('/')
        }}
        >No</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook