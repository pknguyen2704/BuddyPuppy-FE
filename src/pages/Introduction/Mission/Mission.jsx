import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StudyWithBuddyPuppy from '~/assets/Introduction/StudyWithBuddyPuppy.svg';

const Mission = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 6,
        px: 2,
        gap: 3,
      }}
    >
      {/* Tiêu đề */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          lineHeight: 1.3,
          color: '#f0932b',
          mb: 2,
        }}
      >
        Sứ mệnh
      </Typography>

      {/* Bố cục 2 phần */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
          flexWrap: 'wrap', // Cho responsive
        }}
      >
        {/* Bên trái (60%) */}
        <Box
          sx={{
            flexBasis: { xs: '100%', md: '60%' },
            p: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              textAlign: 'justify',
              color: '#555',
            }}
          >
            <strong>Buddy Puppy</strong> được tạo ra với một sứ mệnh giản dị nhưng đầy ý nghĩa:
            mang lại cơ hội học tiếng Anh công bằng và nhân văn cho trẻ em rối loạn phổ tự kỷ (RLPTK).
            <br /><br />
            Chúng tôi tin rằng mỗi bạn trẻ đều có khả năng tỏa sáng nếu được học theo cách phù hợp với mình.
            <strong> Buddy Puppy</strong> không chỉ là một ứng dụng học ngoại ngữ – mà còn là người bạn đồng hành,
            giúp trẻ phát triển kỹ năng giao tiếp, cảm xúc và tự tin hòa nhập với thế giới xung quanh.
          </Typography>
        </Box>

        {/* Bên phải (40%) */}
        <Box
          sx={{
            flexBasis: { xs: '100%', md: '40%' },
            display: 'flex',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Box
            component="img"
            src={StudyWithBuddyPuppy}
            alt="Study With BuddyPuppy"
            sx={{
              width: { xs: '250px', md: '350px' },
              height: 'auto',
              borderRadius: '16px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Box>
      </Box>

      {/* Nút hành động */}
      <Button
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        sx={{
          backgroundColor: '#f0932b',
          color: 'white',
          borderRadius: '30px',
          px: 4,
          py: 1.5,
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#f0932b',
            transform: 'scale(1.05)',
            boxShadow: '0 8px 25px rgba(255, 255, 255, 0.4)',
          },
        }}
      >
        Khám phá hành trình của chúng tôi
      </Button>
    </Box>
  );
};

export default Mission;
