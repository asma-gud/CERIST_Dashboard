

function Validation(values) {
    let error = {}
   
    if(values.nom === "") {
        error.nom = "Name should not be empty"
         }
       
        else {
        error.nom = ""}
        if(values.prenom === "") {
            error.prenom = "Name should not be empty"
             }
           
            else {
            error.prenom = ""}
        if(values.email === "") {
        error.email = "Name should not be empty"
         }
       
        else {
        error.email = ""}

if(values.password === "") {

error.password = "Password should not be empty"
}

 else {
   
error.password =""

  
}
if(values.Cpassword === "") {
    error.Cpassword = "Password should not be empty"
    }
    else {
   /*   if(values.Cpassword !== values.password){
        error.Cpassword= "Password confirmation doesn't much with password"
    } else {
    error.Cpassword =""    
    }*/
    error.Cpassword ="" }
return error;
}
export default Validation;