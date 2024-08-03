import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";


const Team = () => {
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
                ? colors.greenAccent[800]
                : colors.greenAccent[700]
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
    <Box
      m="40px 0 0 0"
      height="75vh"
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
          backgroundColor: colors.blueAccent[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[100],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
        <DataGrid checkboxSelection rows={Users} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
