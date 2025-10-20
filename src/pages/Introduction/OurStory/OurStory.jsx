import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import StudyWithBuddyPuppy from '~/assets/Introduction/StudyWithBuddyPuppy.svg';

const OurStory = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        backgroundColor: '#fffaf3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Tiêu đề */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: '#f0932b',
          mb: 2,
          textAlign: 'center',
        }}
      >
        Câu chuyện của chúng tôi
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: '#666',
          mb: 6,
          textAlign: 'center',
          maxWidth: '800px',
          lineHeight: 1.6,
        }}
      >
        Mọi hành trình lớn đều bắt đầu từ một trái tim nhỏ bé.
      </Typography>

      {/* Phần nội dung chính */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          gap: 6,
        }}
      >
        {/* Bên trái - Text */}
        <Box
          sx={{
            flex: 1,
            textAlign: 'justify',
            color: '#444',
            lineHeight: 1.9,
            fontSize: '1.05rem',
            backgroundColor: 'white',
            borderRadius: '16px',
            p: 4,
            boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
          }}
        >
          <Typography variant="body1" component="div">
            <strong>Buddy Puppy</strong> ra đời từ trăn trở của một nhóm sinh viên trẻ – 
            những người từng chứng kiến sự thiệt thòi của trẻ em tự kỷ khi thiếu vắng các công cụ học tập phù hợp.
            <br /><br />
            Trong quá trình quan sát, chúng tôi nhận ra rằng nhiều trẻ có khả năng tiếp nhận ngôn ngữ rất tốt – 
            đặc biệt là tiếng Anh – nhưng lại thiếu môi trường và phương pháp học tập hiệu quả để phát triển kỹ năng xã hội và giao tiếp.
            <br /><br />
            Từ đó, nhóm quyết tâm xây dựng một ứng dụng học tập vừa mang tính <strong>khoa học</strong>, 
            vừa mang tính <strong>nhân văn</strong>, giúp các em học tiếng Anh thông qua những hoạt động trực quan, 
            thân thiện và tích cực.
          </Typography>

          {/* Icon / highlight bên dưới */}
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              color: '#f0932b',
              fontWeight: 600,
            }}
          >
            <GroupWorkIcon />
            <Typography variant="subtitle1">
              Hành trình nhỏ - Tác động lớn
            </Typography>
          </Box>
        </Box>

        {/* Bên phải - Ảnh minh họa */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={StudyWithBuddyPuppy}
            alt="Buddy Puppy Team"
            sx={{
              width: { xs: '250px', md: '400px' },
              height: 'auto',
              borderRadius: '16px',
              // boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OurStory;
