import React, { useEffect, useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

function Home(data) {
  const [auth , setAuth]=useState(false);
  const [ name , setName] = useState("");
  const location = useLocation();
  const [Users, setUsers] = useState({});

  const users = JSON.parse(localStorage.getItem('users'));
  useEffect(()=>{
    axios.get('http://localhost:8081/home')
   .then(res=> {
  
        if(res.data.Status){
        
          if (users) {
            setUsers(users); }
            console.log(users);
            if(users.Admin==1){
              setAuth(true);
            }
            else{
              setAuth(false)
            }
        
        }
        else{
         
          setAuth(false)
        
        }
  
     }) 
     .catch(err=> alert(err));
  },[]);
  const handleDelete = async()=>{
    const res = await axios
  }
  return (
    <div className='container mt-4'>
      {
        auth?
          <div>
            <h3> Welcome {users.Nom}</h3>
            <Link to="/Dash" className="btn btn-outline-primary">logout</Link>
          </div>
        :
           <div>
              <h3> { name}</h3>
              <h3> login now</h3>
              <Link to="/" className="btn btn-primary">log in</Link>
           </div>
      }

    </div>
  )
}

export default Home
