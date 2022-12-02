import * as React from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { resetAuth } from "../../auth/redux/actions";
import { db,auth } from "../../../firebase";
import { useAppDispatch } from "../../../state/store";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { DataGrid } from '@mui/x-data-grid';
import { query, collection, getDocs, where } from "firebase/firestore";
import { async } from '@firebase/util';
// function Dashboard() {


//   return (
//     <div><h1>Welcome to dashboard</h1><button onClick={onLogOut}>Logout</button></div>
//   )
// }

// export default Dashboard



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
 
  const [posts, setPosts] = React.useState([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    signOut(auth)
    dispatch(resetAuth());
    localStorage.removeItem("token");
    navigate("/");
  };

  React.useEffect(() => {
    const getAdmins = async () => {
      const admins = await getDocs(collection(db, "users"));
      admins.forEach((admin) => {
        setPosts((r) => ([
          ...r,
          { id: admin.data().uid,
            name: admin.data().name,
            lname: admin.data().lname,
            email: admin.data().email,
            gender: admin.data().gender,
            hobbies: admin.data().hobbies,
          },
      ]));
      });
    };

    getAdmins();
  }, []);
  

console.log(posts,'post state data');
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lname',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 110,
      editable: true,
    },
    {
        field: 'hobbies',
        headerName: 'Hobbies',
        width: 110,
        editable: true,
      },
  
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', gender:"male",hobbies:"Meditation" },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', gender:"male",hobbies:"Meditation" },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', gender:"male" ,hobbies:"Meditation"},
    { id: 4, lastName: 'Stark', firstName: 'Arya', gender:"male" ,hobbies:"Meditation"},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', gender:"male" ,hobbies:"Meditation"},
    { id: 6, lastName: 'Melisandre', firstName: null, gender:"male" ,hobbies:"Meditation"},
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', gender:"male" ,hobbies:"Meditation"},
    { id: 8, lastName: 'Frances', firstName: 'Rossini', gender:"male" ,hobbies:"Meditation"},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', gender:"male" ,hobbies:"Meditation"},
  ];
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit"   onClick={onLogOut}>
                <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
      
        rows={posts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}