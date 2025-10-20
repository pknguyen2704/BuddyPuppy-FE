import React from 'react';
import Footer from '~/components/Footer/Footer'
import { Container } from '@mui/material';
import IntroductionHeader from '~/components/IntroductionHeader/IntroductionHeader';
import { Box } from '@mui/material';
import Mission from './Mission/Mission';
import OurApproach from './OurApproach/OurApproach';
import OurStory from './OurStory/OurStory';
import OurTeam from './OurTeam/OurTeam';
import Contact from './Contact/Contact';
import Banner from './Banner/Banner';
const Introduction = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <IntroductionHeader />
      <Box>
        <Banner />
        <Mission />
        <OurStory />
        <OurApproach />
        <OurTeam />
        <Contact />
      </Box>
      <Footer />
    </Container>
  );
}

export default Introduction;
