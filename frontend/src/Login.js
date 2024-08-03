import React,{useState} from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import bg1 from './assets/images/bg4.jpeg'
import axios from 'axios';

function Login() {

    const navigate = useNavigate();
    const [values, setValues]=useState({
        email:'',
        password:''
    })
  
    const [errors , setErrors]=useState({});
 
    const handleSumbit=async(event) => {
   //   const [items, setItems] = useState({});
        event.preventDefault();
        setErrors(Validation(values));
    
          const res =await axios.post('http://localhost:8081/login', values)
          .then(res=> {
            
              if(res.data.Status){
                console.log(res);
                localStorage.setItem('users', JSON.stringify(res.data));
                navigate("/Dash/dashoard" ,{state :{Nom : res.data }});
              }
              else{
                alert("Email or password inccorect")
              }
        
           }) 
           .catch(err=> alert(err));
        
         
         
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-black vh-100 '>
    <div className='d-flex flex-direction-row   w-50'>
     <div className='d-flex  bg-dark rounded-start w-50 flex-shrink-1'> 
        <img src={bg1} className='img-fluid rounded-start' alt="" ></img>
     </div>
        <div className='bg-white p-5 rounded-end w-100'>
            <div>
            <strong>  <h2> Se connecter </h2></strong> 
             </div>
        
        <form action="" onSubmit={handleSumbit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong> Email</strong></label>
                <input type="email" placeholder="Entrez votre email" name='email'
               onChange={e => setValues({ ...values, email: e.target.value})}  className='form-control rounded-10'/>
             {errors.email && <span className='text-danger'> {errors.email}</span> }
             </div>
             <div className='mb-3'>
                <label htmlFor="password"><strong> Mot de pass</strong></label>
                <input type="password" placeholder="Entrez votre mot de pass" name='password'
                onChange={e => setValues({ ...values, password: e.target.value})} className='form-control rounded-10'/>
                 {errors.password && <span className='text-danger'> {errors.password}</span> }
             </div>
             <button type='submit' className='btn btn-primary w-100  rounded-10'>Se connecter</button>
             <p>    </p>
                 <div className='d-flex justify-content-center  align-iterms-center'>
                 <p  className='p-1 text-muted'> <small> Les admins  sont responsables de la création et de la gestion des comptes </small> </p>
                
                 </div>
         </form>
         </div> 
      </div>
      </div>
  )
}

export default Login