import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BookCard from '../components/home/BookCard'
import BookTable from '../components/home/BookTable'
import { Link } from 'react-router-dom'
import { BsInfoCircle } from 'react-icons/bs'
import { MdMenuBook , MdOutlineDelete} from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaUsers } from "react-icons/fa";
const IssuedBooks = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [showType, setShowType] = useState('table');
    useEffect(() => {
        setLoading(true);
        axios
          .get("http://localhost:5555/issuedBooks")
          .then((res) => {
            setBooks(res.data.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }, []);
  return (
    <div className='p-4'>
        <div className=" flex justify-between items-center">
        <h1 className="flex text-3xl my-8">Issued Books</h1>
        </div>
        {/* {loading ? <Spinner /> : showType === 'table' ? <BookTable books= {books}/> : <BookCard books= {books}/>} */}
        <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Title</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Author
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Publish Year
                </th>
                <th className="border border-slate-600 rounded-md">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {book.title}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {book.author}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {book.publishYear}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800 " />
                      </Link>
                      <Link to={`/issuedBooks/${book._id}`}>
                            <FaUsers className="text-2xl text-green-800" />
                    </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      <div className='flex w-full justify-center items-center gap-x-4 fixed bottom-7'>
        <button onClick={()=>setShowType('table')} className={`px-4 py-2 rounded
            ${showType === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}> 
          Table
        </button>
        <button onClick={()=>setShowType('card')} className={`px-4 py-2 rounded
            ${showType === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}> 
          Card
          </button>
      </div>
    </div>
  )
}

export default IssuedBooks