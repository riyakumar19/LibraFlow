import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import axios from 'axios'
import Spinner from '../components/Spinner'
const IssueBook = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [rollNo, setRollNo] = useState('')
    const [loading, setLoading] = useState(false)
    const [errM, setErrM] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();
    const handleIssueBook = ()=>{
        const data = {
            name,
            phone,
            email,
            rollNo
        };
        axios
            .post(`http://localhost:5555/books/issue/${id}`, data)
            .then((res) => {
                setLoading(false);
                navigate('/')
            })
            .catch((err) => {
                setLoading(false)
                setErrM(err.response.data);
                alert('An error occured. Please check console') 
                console.log(err.response.data)
            })

    }
  return (
    <div className=' p-4'>
        <BackButton />
        <h1 className='text-3xl my-4 text-center'>Issue Book</h1>
       {loading? (<Spinner/>):''  }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] mx-auto p-4'>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
          type='text'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Phone No. </label>
          <input
          type='text'
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
          type='text'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
         <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Roll No. </label>
          <input
          type='text'
          value={rollNo}
          onChange={(e)=>setRollNo(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button
        onClick={handleIssueBook}
        className='bg-sky-400 text-white py-2 w-full rounded-md hover:bg-s
        ky-500 transition-all duration-300 ease-in-out'
        >Issue Book</button>
      </div>
    </div>
  )
}

export default IssueBook