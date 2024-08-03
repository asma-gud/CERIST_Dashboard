import { Box, Button, TextField } from "@mui/material";
import { Formik,Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

     
  const handleFormSubmit=async (values) => {
  
   try{
      const res = await axios.post('http://localhost:8081/Dash/form', values)
     
        if(res.data.Status){ 
          alert("user created succesfully ")
        }
        else
        {alert(res.data.Error)}
      }

      
    catch(err){
       alert(err)
    }
      
    

}


  return (
    <Box m="20px">
      <Header title="CRÉER UN UTILISATEUR" subtitle="Créer un nouveau profil utilisateur" />

      <Formik
     //  onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
       //   handleSubmit,
        }) => (
          <form 
        //  onSubmit={handleSubmit}
          >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Nom}
                name="Nom"
                error={!!touched.Nom && !!errors.Nom}
                helperText={touched.Nom && errors.Nom}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Prenom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Prenom}
                name="Prenom"
                error={!!touched.Prenom && !!errors.Prenom}
                helperText={touched.Prenom && errors.Prenom}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Email}
                name="Email"
                error={!!touched.Email && !!errors.Email}
                helperText={touched.Email && errors.Email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numero telephone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Ntel}
                name="Numtel"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mot de pass"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Password}
                name="mdp"
                error={!!touched.mdp && !!errors.mdp}
                helperText={touched.mdp && errors.mdp}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirmation du mot de pass"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Cpassword}
                name="Cmdp"
                error={!!touched.Cmdp && !!errors.Cmdp}
                helperText={touched.Cmdp && errors.Cmdp}
                sx={{ gridColumn: "span 4" }}
              />
            <label>
              <Field type="radio" name="Admin" value="1" />
              Admin
            </label>
            <label>
              <Field type="radio" name="Admin" value="0" />
             User
            </label>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button  color="secondary" variant="contained" 
              onClick={()=>{
                handleFormSubmit(values)}}
              >
              Créer un utilisateur
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
 Nom: yup.string().required("required"),
  Prenom: yup.string().required("required"),
  Email: yup.string().email(" email n'est pas valid").required("required"),
  Numerotel: yup
    .string()
    .matches(phoneRegExp, "Numero telephone n'est pas valid")
    .required("required"),
  mdp: yup.string()
  .required()
  .min(6),
  Cmdp :  yup.string()
  .oneOf([yup.ref('mdp'), null], 'mot de pass erroné')
 
});
const initialValues = {
  Nom: "",
  Prenom: "",
  Email: "",
  Numtel: "",
  mdp: "",
  Cmdp: "",
  Admin : "",
};

export default Form;
