import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import GroupIcon from '@mui/icons-material/Groups';

const OurTeam = () => {
  const team = [
    {
      name: 'Phùng Quang Thịnh',
      role: 'Nghiên cứu và phát triển học liệu số',
      school: 'Trường Đại học Ngoại ngữ, Đại học Quốc gia Hà Nội',
      avatar: '/images/team/thinh.jpg'
    },
    {
      name: 'Khuất Thị Thủy Chi',
      role: 'Nghiên cứu và phát triển học liệu số',
      school: 'Trường Đại học Sư phạm Hà Nội',
      avatar: '/images/team/chi.jpg'
    },
    {
      name: 'Phùng Khôi Nguyên',
      role: 'Lập trình viên',
      school: 'Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội',
      avatar: '/images/team/nguyen.jpg'
    },
    {
      name: 'Nguyễn Lê Việt Cường',
      role: 'Lập trình viên',
      school: 'Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội',
      avatar: '/images/team/cuong.jpg'
    },
    {
      name: 'Hoàng Hải Dương',
      role: 'Lập trình viên',
      school: 'Trường Đại học FPT Hà Nội',
      avatar: '/images/team/duong.jpg'
    }
  ];

  return (
    <Box
      sx={{
        py: 10,
        px: 2,
        backgroundColor: '#fffaf3',
        textAlign: 'center'
      }}
    >
      {/* Tiêu đề */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#f0932b',
            mb: 2,
          }}
        >
          Đội ngũ của chúng tôi
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#555',
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.7
          }}
        >
          Buddy Puppy là kết quả của sự kết hợp giữa tâm huyết giáo dục và năng lực công nghệ,
          cùng chung một khát vọng: tạo ra một sản phẩm học tập hữu ích, dễ tiếp cận
          và đầy yêu thương cho trẻ em tự kỷ Việt Nam.
        </Typography>
      </Box>

      {/* Danh sách thành viên */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ maxWidth: '1100px', mx: 'auto' }}
      >
        {team.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                }}
              >
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{
                    width: 130,
                    height: 130,
                    mb: 2,
                    border: '4px solid #f0932b',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                    bgcolor: '#f0932b',
                    fontSize: '2rem',
                  }}
                >
                  {!member.avatar && member.name.charAt(0)}
                </Avatar>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#333', mb: 0.5 }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '0.9rem',
                    maxWidth: 300,
                    lineHeight: 1.6,
                  }}
                >
                  {member.role}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '0.9rem',
                    maxWidth: 220,
                    lineHeight: 1.6,
                  }}
                >
                  {member.school}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurTeam;
