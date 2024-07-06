import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () =>{
    const data = {
      title,
      author,
      publishYear,
      quantity
    };
    setLoading(true);
    axios
    .post(`http://localhost:5555/books`, data)
    .then(()=>{
      setLoading(false)
      navigate('/'); 
    })
    .catch((err)=>{
      setLoading(false)
      alert('An error occured. Please check console') 
      console.log(err);
    })
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4 text-center'>Add Book</h1>
      {loading? (<Spinner/>):''  }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] mx-auto p-4'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
          type='text'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
          type='text'
          value={author}
          onChange={(e)=>setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
          type='text'
          value={publishYear}
          onChange={(e)=>setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
          type='text'
          value={quantity}
          onChange={(e)=>setQuantity(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button
        onClick={handleSaveBook}
        className='bg-sky-400 text-white py-2 w-full rounded-md hover:bg-s
        ky-500 transition-all duration-300 ease-in-out'
        >Add Book</button>
      </div>
    </div>
  )
}

export default CreateBook