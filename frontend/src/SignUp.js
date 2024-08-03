import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignUpValidaion'
import bg1 from './assets/images/bg4.jpeg'
import axios from 'axios';
function SignUp() {
    const [values, setValues]=useState({
        nom:'',
        prenom:'',
        email:'',
        password:'',
        Cpassword:'',
    })
    
  const navigate = useNavigate();
    const [errors , setErrors]=useState({});
    const handleInput=(event) => {
       setValues(prev =>({...prev ,[event.target.name]:[event.target.value]}))

    }
   
    const handleSumbit=async (event) => {
       
        event.preventDefault();
       try{
          const res = await axios.post('http://localhost:8081/Signup', values)
          .then(res => {
            if(res.data.Status){  navigate('/Home');}
            else{alert("Error signing up ")}
          })
       
        }
        catch(err){
           alert("EROOR")
        }
          
        

    }
   
  
  return (   
     <div className='d-flex justify-content-center align-items-center bg-black vh-100 '>
    <div className='d-flex flex-direction-row   w-50'>
    <div className='d-flex  bg-primary rounded-start w-50 flex-shrink-1'> 
        <img src={bg1} className='img-fluid' alt="" ></img>
     </div>
        <div className='bg-white p-5 rounded-end w-100'>
            <h2> Creer un compte</h2>
            <form action="" onSubmit={handleSumbit}>
                <div className='mb-3'>
                    <label htmlFor="nom"><strong> Nom</strong></label>
                     <input type="nom" placeholder="Entrer votre nom" name='nom'
                     onChange={e => setValues({ ...values, nom: e.target.value})} className='form-control rounded-10 '/>
                      {errors.nom && <span className='text-danger'> {errors.nom}</span> }
                </div>

                <div className='mb-3'>
                    <label htmlFor="prenom"><strong> Prenom</strong></label>
                     <input type="prenom" placeholder="Entrer votre prenom" name='prenom'
                     onChange={e => setValues({ ...values, prenom: e.target.value})}  className='form-control rounded-10'/>
                      {errors.prenom && <span className='text-danger'> {errors.prenom}</span> }
                </div>
        
                <div className='mb-3'>
                    <label htmlFor="email"><strong> Email</strong></label>
                     <input type="email" placeholder="Entrer votre email" name='email'
                     onChange={e => setValues({ ...values, email: e.target.value})}   className='form-control rounded-10'/>
                      {errors.email && <span className='text-danger'> {errors.email}</span> }
                </div>

              <div className='mb-3'>
                    <label htmlFor="password"><strong> Mot de pass</strong></label>
                     <input type="password" placeholder="" name='password'
                     onChange={e => setValues({ ...values, password: e.target.value})}  className='form-control rounded-10'/>
                     {errors.password && <span className='text-danger'> {errors.password}</span> }
               </div>
               <div className='mb-3'>
                    <label htmlFor="Cpassword"><strong> Confirmation du mot de pass</strong></label>
                     <input type="password" placeholder="" name='Cpassword'
                     onChange={e => setValues({ ...values, Cpassword: e.target.value})}  className='form-control rounded-10'/>
                     {errors.Cpassword && <span className='text-danger'> {errors.Cpassword}</span> }
               </div>

                 <button className='btn btn-primary w-100  rounded-10'>Sign up</button>
                 <p>    </p>
                 <div className='d-flex justify-content-center flex-direction-row  align-iterms-center'>
                 <p  className='p-1'> <small> Si vous avez déja un compte  </small> </p>
                <Link  to="/" className='p-1'> <small>  Log in </small> </Link>
                 </div>
               
             </form>
         </div> 
      </div>
      </div>
  )
}

export default SignUp