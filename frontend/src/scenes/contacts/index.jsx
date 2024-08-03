import { Box,Button,Typography} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";


const Contacts = () => {
const [Delete, setDelete] = useState([]);
const [values, setValues]=useState({
 id:null
})
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Users , setUsers]=useState(
    {
      id:'',
      Nom:'',
      Prenom:'',
      Numtel:'',
      Email: '',
      Admin:0
    }
  );
 const handleDelete =(ids)=>{
  let id ;
  try{
 for (let i = 0; i < ids.length; i++) {
 id=ids[i];
  
  axios.delete('http://localhost:8081/Dash/team'+id)
  .then(res =>{
    if(res.data.Status){
      
     //  alert("utolisateur supprimé")
    }
    else{
      console.log(res)
    }
  
  }
  )
  .catch(err=> {alert(err)})
 }
window.location.reload();
}
catch(err){
  alert(err)
}
 
 }
  useEffect(() => {
 axios.post('http://localhost:8081/Dash/team')
  .then(res=> {
    
      if(res.data.Status){
       
       setUsers(res.data.Users)
       console.log(Users)
       
      }
      else{
        console.log(res.data);
       // alert(res)
      }

   }) 
   .catch(err=> alert(err));
  }, []) 
  
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "Nom",
      headerName: "Nom",
      flex: 1,
      cellClassName: "Nom-column--cell",
    },
   
    {
      field: "Prenom",
      headerName: "Prenom",
      flex: 1,
      cellClassName: "Prenom-column--cell",
    },
   
    {
      field: "Numtel",
      headerName: "Numero telephone",
      flex: 1,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "Admin",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { Admin } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              Admin === 1
                ? colors.greenAccent[500]
                : colors.blueAccent[800]
            }
            borderRadius="4px"
          >
            {Admin === 1 && <AdminPanelSettingsOutlinedIcon />}
            {Admin === 0 && <LockOpenOutlinedIcon />}
        
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {Admin === 1 && "Admin"}
              {Admin === 0 && "User"}
            </Typography>
          </Box>
        );
      },
    },
  ];


  return (
    <Box m="20px">
    <Header title="L'ÉQUIPE" subtitle="Gérer les membres de l'équipe" />
   <Box display="flex" flexDirection="row-reverse" mr="10px">
    <Button  size="small"  color="primary" variant="outlined"  startIcon={<DeleteIcon/>}
    onClick={()=>{handleDelete(Delete)}} >Supprimer</Button >
    </Box>
    <Box
  
        m="-20px 0 0 0"
        height="72vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[500],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[500],
          },
          "& .MuiCheckbox-root": {
            color: `${ colors.blueAccent[500]} !important`,
          },
        }}
      > 
       
  
        <DataGrid
         checkboxSelection 
          rows={Users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowSelectionModelChange={itm => setDelete(itm)}
        />
      </Box>
   
    </Box>
  );
};

export default Contacts;
