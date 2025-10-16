import {extendTheme} from '@mui/material/styles'

const APP_BAR_HEIGHT = '64px'
const APP_FOOTER_HEIGHT = '40px'
const APP_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${APP_FOOTER_HEIGHT})`
const APP_CONTENT_BAR_HEIGHT = '64px'
const APP_CONTENT_TABLE_HEIGHT = `calc(${APP_CONTENT_HEIGHT} - ${APP_CONTENT_BAR_HEIGHT})`
const APP_CONTENT_DASHBOARD_HEIGHT = `calc(${APP_CONTENT_HEIGHT} - ${APP_CONTENT_BAR_HEIGHT})`
const theme = extendTheme({
  BuddyPuppy: {
    appBarHeight: APP_BAR_HEIGHT,
    appContentHeight: APP_CONTENT_HEIGHT,
    appFooterHeight: APP_FOOTER_HEIGHT,
    appContentBarHeight: APP_CONTENT_BAR_HEIGHT,
    appContentTableHeight: APP_CONTENT_TABLE_HEIGHT,
    appContentDashboardHeight: APP_CONTENT_DASHBOARD_HEIGHT,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: 'black',
          fontWeight: '600',
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
  }
})

export default theme