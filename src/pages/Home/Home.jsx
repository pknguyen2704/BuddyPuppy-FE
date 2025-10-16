import React from 'react'
import { Container, Box } from '@mui/material'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import SideBar from '~/components/SideBar/SideBar'
import Content from './Content/Content'

const Home = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: (theme) => theme.BuddyPuppy.appContentHeight,
        }}
      >
        {/* Sidebar chiếm 20% */}
        <Box
          sx={{
            width: '10%',
            borderRight: '1px solid #e0e0e0',
            flexShrink: 0, // tránh bị co lại
            minWidth: '200px'
          }}
        >
          <SideBar />
        </Box>

        {/* Content chiếm phần còn lại */}
        <Box sx={{ 
          width: '90%',
          backgroundColor: '#f5f6fa',
        }}>
          <Content />
        </Box>
      </Box>
      <Footer />
    </Container>
  )
}

export default Home
