import React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Contact = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fffaf3',
        py: 8,
        px: { xs: 2, md: 8 },
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
        Liên hệ với chúng tôi
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: '#555',
          maxWidth: '850px',
          textAlign: 'center',
          mb: 6,
          lineHeight: 1.8,
        }}
      >
        Buddy Puppy vẫn đang trên hành trình hoàn thiện và lan tỏa.  
        Chúng tôi luôn trân trọng mọi đóng góp, chia sẻ và hợp tác từ phụ huynh, giáo viên, chuyên gia và cộng đồng.  
        Hãy cùng chúng tôi đồng hành vì một thế giới học tập hòa nhập hơn cho mọi đứa trẻ. 💛
      </Typography>

      {/* Bố cục 2 bên */}
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ maxWidth: '1100px' }}
      >
        {/* BÊN TRÁI - Thông tin liên hệ */}
        <Grid item xs={12} md={5}>
          <Box sx={{ color: '#555', lineHeight: 1.8 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <EmailIcon sx={{ color: '#f0932b', verticalAlign: 'middle', mr: 1 }} />
              <strong>Email:</strong> glow.thinhphung@gmail.com
            </Typography>

            <Typography variant="body1">
              <PhoneIcon sx={{ color: '#f0932b', verticalAlign: 'middle', mr: 1 }} />
              <strong>Số điện thoại:</strong> 0326 328 804
            </Typography>
          </Box>
        </Grid>

        {/* BÊN PHẢI - Form liên hệ */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              backgroundColor: '#fff',
              p: 4,
              borderRadius: '16px',
              boxShadow: '0 6px 25px rgba(0,0,0,0.08)',
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              mb={3}
              color="#333"
              textAlign="center"
            >
              Gửi tin nhắn cho chúng tôi
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Họ và tên" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nội dung"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#f0932b',
                  color: '#fff',
                  borderRadius: '10px',
                  px: 4,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#e67e22',
                  },
                }}
              >
                Gửi ngay
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Lời cảm ơn nhỏ */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="body2" color="#777">
          Cảm ơn bạn đã quan tâm đến <strong>Buddy Puppy</strong>!{' '}
          <FavoriteIcon sx={{ color: '#f0932b', fontSize: 18, ml: 0.5 }} />
        </Typography>
      </Box>
    </Box>
  );
};

export default Contact;
