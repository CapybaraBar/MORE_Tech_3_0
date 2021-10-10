import * as React from 'react'

import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import LogoutIcon from '@mui/icons-material/Logout'
import { mainListItems, secondaryListItems } from '../client/listItems'
import Copyright from '../client/Copyright'

import DatasetCard from '../client/DatasetCard'
import getServerSideProps from '../server/get-server-side-props'
import {FormControl, InputLabel, OutlinedInput, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";

const drawerWidth = 240

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
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
}))

export default function Index({ datasets, categories }) {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const [search, updateSearch] = React.useState('');

  const handleChangeSearch = (event) => {
    updateSearch(event.target.value)
  };

  return (
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
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Datasets
          </Typography>
          <IconButton color="inherit">

            <LogoutIcon onClick={()=>{window.location='/api/logout'}} />

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
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="search">Search</InputLabel>
            <OutlinedInput
              id="search"
              value={search}
              onChange={handleChangeSearch}
              label="Search"
            />
          </FormControl>
          <React.Fragment>
            {datasets.filter(
              ({entity}) => {
                if(search === '') { return true }
                return JSON.stringify({
                  name: entity?.name,
                  description: entity?.properties?.description,
                  tags: entity?.tags?.tags?.map((item) => item?.tag?.name)
                }).toLocaleLowerCase().includes(search.toLocaleLowerCase())
              }
            ).map(({ entity }) => (
              <DatasetCard key={entity.urn} {...entity} />
            ))}
          </React.Fragment>
          <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 30, right: 30 }}
          icon={<SpeedDialIcon />}
          >

        </SpeedDial>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  )
}



export { getServerSideProps }
