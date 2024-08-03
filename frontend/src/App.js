
import './App.css';
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie"
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Dash from './Dash';
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>

       
      <Routes>
       <Route path='/' element={<Login/>}> </Route>
       <Route path='/SignUp' element={<SignUp/>}> </Route>
       <Route path='/Home' element={<Home/>}> </Route>
      <Route path='/Dash' element={<Dash/>}>
              <Route path="/Dash/dashoard" element={<Dashboard />} />
              <Route path="/Dash/team" element={<Team />} />
              <Route path="/Dash/contacts" element={<Contacts />} />
              <Route path="/Dash/invoices" element={<Invoices />} />
              <Route path="/Dash/form" element={<Form />} />
              <Route path="/Dash/bar" element={<Bar />} />
              <Route path="/Dash/pie" element={<Pie />} />
              <Route path="/Dash/line" element={<Line />} />
              <Route path="/Dash/faq" element={<FAQ />} />
              <Route path="/Dash/calendar" element={<Calendar />} />
              <Route path="/Dash/geography" element={<Geography />} />
           
      </Route>
         
      </Routes> 

      </ThemeProvider>
    </ColorModeContext.Provider>
  
    
    
    
  );
}

export default App;
