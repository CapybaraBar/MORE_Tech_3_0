import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  // palette: {
  //   mode: 'dark'
  // }
  palette: {
    background: {
      default: 'url(/background.png)',
    },
  },
  // palette: {
  //   primary: {
  //     main: "#556cd6",
  //   },
  //   secondary: {
  //     main: "#19857b",
  //   },
  //   error: {
  //     main: red.A400,
  //   },
  //   background: {
  //   default: {
  //     background: 'url(/background.png)',
  //     backgroundPosition: '50% 50%',
  //     backgroundSize: 'cover'
  //   }
  //   }
  // },
})

export default theme
