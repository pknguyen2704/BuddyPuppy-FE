import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import StudyWithBuddyPuppy from '~/assets/Introduction/StudyWithBuddyPuppy.svg';

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 10,
        // justifyContent: 'center',
        minHeight: { xs: '80vh', md: '80vh' },
        color: '#fff',
        textAlign: 'center',
        px: 2,
        background: 'linear-gradient(135deg, #f6e58d 0%, #f0932b 100%)',
      }}
    >
      {/* Sóng dưới */}
      <Box
        component="svg"
        viewBox="0 0 1440 280"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          zIndex: 1,
        }}
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,160L48,138.7C96,117,192,75,288,80C384,85,480,139,576,165.3C672,192,768,192,864,181.3C960,171,1056,149,1152,122.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </Box>

      <Box
        component="img"
        src={StudyWithBuddyPuppy}
        alt="Study With BuddyPuppy"
        sx={{
          zIndex: 2,
          width: { xs: '180px', md: '240px' },
          height: 'auto',
          mb: 3,
          transition: 'transform 0.4s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />

      {/* Nội dung */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 3,
          zIndex: 2,
          maxWidth: '900px',
          lineHeight: 1.3,
          textShadow: '0px 3px 8px rgba(0,0,0,0.25)',
        }}
      >
        Nền tảng học tiếng Anh <br/> dành cho trẻ mắc hội chứng ASD
      </Typography>

      {/* Nút CTA */}
      <Button
        variant="contained"
        size="large"
        sx={{
          zIndex: 2,
        }}
      >
        Bắt đầu ngay!
      </Button>
    </Box>
  );
};

export default Banner;
