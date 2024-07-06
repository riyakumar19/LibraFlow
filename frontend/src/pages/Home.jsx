import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineAddBox } from "react-icons/md";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [showType, setShowType] = useState('table');
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
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
    <div className="p-4 ">
      <div className=" flex justify-between items-center">
        <Link to = "/">
          <h1 className="flex text-3xl my-8">Books List</h1>
        </Link>
        <Link to = "/issuedBooks">
          <h1 className="flex text-3xl my-8">Issued Books</h1>
        </Link>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl " />
        </Link>
        </div>
        {loading ? <Spinner /> : showType === 'table' ? <BookTable books= {books}/> : <BookCard books= {books}/>}
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
  );
};

export default Home;
