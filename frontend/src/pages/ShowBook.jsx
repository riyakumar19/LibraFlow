import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'


const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/books/${id}`)
    .then((res)=>{
      setBook(res.data);
      setLoading(false)
    })
    .catch((error)=>{
      console.log(error)
      setLoading(false)
    });
  }, []);
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-center text-3xl my-4'>Show Book</h1>
      <div className='flex justify-center'>

      {loading?
      (Spinner):
      (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Id :</span>
          <span className=''>{book._id}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Title :</span>
          <span className=''>{book.title}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Author :</span>
          <span className=''>{book.author}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Publish Year :</span>
          <span className=''>{book.publishYear}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Available Quantity :</span>
          <span className=''>{book.quantity}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Issued Quantity :</span>
          <span className=''>{book.issuedCount}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Create Time :</span>
          <span className=''>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Last Update Time :</span>
          <span className=''>{new Date(book.updatedAt).toString()}</span>
          </div>

        </div>
      )  
    }
    </div>
    </div>
  )
}

export default ShowBook