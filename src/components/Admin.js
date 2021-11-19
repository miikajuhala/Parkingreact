import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import SwipeableViews from 'react-swipeable-views';
import Collapse from '@material-ui/core/Collapse';

import jwt from 'jwt-decode'
import PropTypes from 'prop-types';
import { green } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import loginImg from './login.jpg'


            function TabPanel(props) {
                const { children, value, index, ...other } = props;
            
                return (
                <Typography
                    component="div"
                    role="tabpanel"
                    hidden={value !== index}
                    id={`action-tabpanel-${index}`}
                    aria-labelledby={`action-tab-${index}`}
                    {...other}
                >
                    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
                </Typography>
                );
            }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
            function a11yProps(index) {
                return {
                id: `action-tab-${index}`,
                'aria-controls': `action-tabpanel-${index}`,
                };
            }
  
  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };
  
            const fabGreenStyle = {
                color: 'common.white',
                bgcolor: green[500],
                '&:hover': {
                bgcolor: green[600],
                },
            };

export default function Admin(props) {

    const [open, setOpen] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const [userJwt, setUserJwt] = React.useState(null);
    const [clicked, setClicked] = React.useState(false);

    const url = "http://localhost:8080"

    const [user, setUser] = React.useState({username: "", password:""});
    const [loggedin, setLoggedin] = React.useState(false);

    
//Snackbar maarittelyä
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="primary"
            onClick={()=>setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    )


    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
  
    const fabs = [
      {
        color: 'secondary',
        sx: fabStyle,
        icon: <LoginIcon onClick={()=>getToken()} />,
        label: 'Add',
      },
      {
        color: 'primary',
        sx: fabStyle,
        icon: <LoginIcon onClick={()=>getToken()}/>,
        label: 'Edit',
      },
    ]





// TÄSSÄ LOPPUU TYYLIMÄÄRITTELYT



//HAETAAN TOKENI SERVULTA
const getToken = () => {

    axios.post("http://localhost:8080/login", {
        username:"admin", password:"admin"
      })
        .then((response) => {
          console.log(response);
      
            const jwtToken = response.headers.authorization

            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken)
                sessionStorage.setItem("role", jwt(jwtToken).sub)
            console.log(jwt(jwtToken).sub)
                    setClicked(false);
                    setLoggedin(true);
                    setMsg("Logged in succesfully!"+sessionStorage.getItem("jwt"))
                    setOpen(true)
                    
                    
            }
            }, (error) => {
                console.log(error)
                setMsg(error+"error")
                setOpen(true)
            });
 
    
    }
    

   const handleChange1 = (event)=>{
    setUser({...user, [event.target.name]: event.target.value});
    
    }



return( 
    
    <main> 
        {loggedin===false && <div className="loginImage">
        {sessionStorage.getItem("jwt") === null && <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>}
    </div>}
   
   <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="top"
  style={{ minHeight: '100vh' }}
>

{sessionStorage.getItem("jwt") === null && <Box 
        sx={{
            
            bgcolor: 'background.paper',
            width: 500,
            position: 'relative',
            minHeight: 200,
        }}
        >
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
            >
                <Tab label="Admin Login" {...a11yProps(0)} />
                <Tab label="User login" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                        <div> Admin Login </div>
                                    <TextField id="outlined-basic" name ="username" label="username" variant="outlined" onChange={handleChange1}/>
                                    <TextField id="filled-basic" name ="password" type="password" label="password" variant="filled" onChange={handleChange1} />
                        </TabPanel>

                        <TabPanel value={value} index={1} dir={theme.direction}>
                        <div> User login </div>
                                    <TextField id="outlined-basic" name ="username" label="username" variant="outlined" onChange={handleChange1}/>
                                    <TextField id="filled-basic" name ="password" type="password" label="password" variant="filled" onChange={handleChange1} />
                        </TabPanel>
    
                </SwipeableViews>
            {fabs.map((fab, index) => (
                        <Zoom
                        key={fab.color}
                        in={value === index}
                        timeout={transitionDuration}
                        style={{
                            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                        }}
                        unmountOnExit
                        >
                        <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
                            {fab.icon}
                        </Fab>
                        </Zoom>
            ))}
        </Box>}

    
 
                    {/* Tässä resultit, jos role admin niin pääsee sisään */}
                      <button> results</button> 

</Grid> 

<Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={()=>setOpen(false)}
        message={msg}
        action={action}
        alignItems="center"
        justifyContent="center"
        color="secondary"
      />
      </main> 
)
}

