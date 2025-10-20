import { DisplaySettings } from '@mui/icons-material';
import React from 'react';
import { Box, Typography } from '@mui/material';
const OurStory = () => {
  return (
    <Box sx={{
      display: 'flex-column',
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant='h5'>
          Our Story
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        flex: 1
      }}>
        <Typography variant='body1'>
          Buddy Puppy ra đời từ trăn trở của một nhóm sinh viên trẻ – những người từng chứng kiến sự thiệt thòi của trẻ em tự kỷ khi thiếu vắng các công cụ học tập phù hợp. <br />
Trong quá trình quan sát, chúng tôi nhận ra rằng nhiều trẻ có khả năng tiếp nhận ngôn ngữ rất tốt – đặc biệt là tiếng Anh – nhưng lại thiếu môi trường và phương pháp học tập hiệu quả để phát triển kỹ năng xã hội và giao tiếp. <br />
Từ đó, nhóm quyết tâm xây dựng một ứng dụng học tập vừa mang tính khoa học, vừa mang tính nhân văn, giúp các em học tiếng Anh thông qua những hoạt động trực quan, thân thiện và tích cực. <br />
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flex: 2
      }}>
      </Box>
    </Box>
  );
}

export default OurStory;
