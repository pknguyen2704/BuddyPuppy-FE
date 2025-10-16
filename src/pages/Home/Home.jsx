import React from 'react'
import { Container } from '@mui/material'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import SideBar from '~/components/SideBar/SideBar'
import { Box } from '@mui/material';
import Content from './Content/Content'

const Home = () => {
  return (
    <Container disableGutters maxWidth="false" sx={{height: '100vh'}}>
      <Header />
      <Box sx={{display: 'flex', flexDirection: 'row', height: ')', height: (theme) => theme.BuddyPuppy.appContentHeight}}>
        <Box sx={{flex: 1, borderRight: '1px solid #e0e0e0', width: '150px'}}>
          <SideBar />
        </Box>
        <Box sx={{flex: 2}}>
          <Content />
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}

export default Home;
