import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import venn from "~/assets/Introduction/venn.svg";

const OurApproach = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fffaf3',
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
        Phương pháp tiếp cận
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: '800px',
          textAlign: 'center',
          lineHeight: 1.8,
          color: '#555',
          mb: 6,
        }}
      >
        Buddy Puppy được phát triển dựa trên nền tảng các nghiên cứu khoa học về giáo dục đặc biệt và công nghệ hỗ trợ học tập. 
        Ứng dụng kết hợp hai phương pháp chính để hỗ trợ trẻ phát triển ngôn ngữ và kỹ năng xã hội.
      </Typography>

      <Box>
        <img
          src={venn}
          alt="Venn"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>

      {/* Hai thẻ mô tả phương pháp */}
      <Grid container spacing={4} sx={{ maxWidth: '1000px' }}>
        {/* PECS */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              borderRadius: '16px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-6px)' },
              height: '100%',
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <PsychologyAltIcon sx={{ fontSize: 60, color: '#f0932b', mb: 2 }} />
              <Typography variant="h6" fontWeight={700} mb={1}>
                PECS (Picture Exchange Communication System)
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.7, color: '#555' }}>
                Giúp trẻ học cách giao tiếp qua hình ảnh, từng bước hình thành khả năng diễn đạt bằng ngôn ngữ. 
                Phương pháp này thúc đẩy sự tự tin và khả năng tương tác tự nhiên.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Stories */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              borderRadius: '16px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-6px)' },
              height: '100%',
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <EmojiPeopleIcon sx={{ fontSize: 60, color: '#f0932b', mb: 2 }} />
              <Typography variant="h6" fontWeight={700} mb={1}>
                Social Stories (Câu chuyện xã hội)
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.7, color: '#555' }}>
                Giúp trẻ hiểu và ứng xử trong các tình huống giao tiếp thực tế thông qua mô phỏng và kể chuyện. 
                Qua đó, trẻ phát triển kỹ năng xã hội và hành vi tích cực.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OurApproach;
