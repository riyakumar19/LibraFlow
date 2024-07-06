import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineAssignmentReturned, MdAssignmentReturn, MdInfo} from 'react-icons/md'
import BackButton from '../components/BackButton'
import { BsInfoCircle } from 'react-icons/bs'
const IssuedBookUser = () => {
    const [book, setBook] = useState(null);
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const {id} = useParams()
    useEffect(() => {
        setLoading(true);
        axios
          .get(`http://localhost:5555/issuedBooks/${id}`)
          .then((res) => {
            setBook(res.data.data);
            setUsers(res.data.data.issuedTo.map(issue=>issue.userId));
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }, [id]);
      const handleReturnBook = (user) => {
        setLoading(true);
        axios
            .post(`http://localhost:5555/issuedBooks/return/${id}`, { rollNo: user.rollNo })
            .then((res) => {
                setUsers(users.filter(u => u._id !== user._id));
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
  return (
      <div className='p-4'>
        <BackButton/>
        {book && (
                        <div className="mb-4">
                            <h1 className="text-2xl font-bold">{book.title}</h1>
                            <span className="text-lg">{book.author} </span>
                            <span className="text-lg"> {book.publishYear}</span>
                        </div>
                    )}
        <h1>Users who issued this book</h1>
        <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Name</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Phone No
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Email Id
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden">Roll No</th>
                <th className="border border-slate-600 rounded-md">Return Book</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.name}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {user.phone}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {user.email}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {user.rollNo}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <button onClick={()=>handleReturnBook(user)}>
                        <MdOutlineAssignmentReturned className="text-2xl text-green-800 " />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}

export default IssuedBookUser