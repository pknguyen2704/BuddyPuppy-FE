import React, { useEffect, useState, useRef } from 'react';
import { Box, Container, CircularProgress, Typography, Button } from '@mui/material';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import SideBar from '~/components/SideBar/SideBar';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ttsFunction } from '~/service/ttsService';
import { ConfettiEffect } from '~/components/Confetti';

// ✅ Import hình ảnh cho từng story
// Story 1
import q1s1 from '~/assets/SocialStory/SocialStory1/q1s1.png';
import q2s1 from '~/assets/SocialStory/SocialStory1/q2s1.png';
import q3s1 from '~/assets/SocialStory/SocialStory1/q3s1.png';

// Story 2
import q1s2 from '~/assets/SocialStory/SocialStory2/q1s2.png';
import q2s2 from '~/assets/SocialStory/SocialStory2/q2s2.png';
import q3s2 from '~/assets/SocialStory/SocialStory2/q3s2.png';

// Story 3
import q1s3 from '~/assets/SocialStory/SocialStory3/q1s3.png';
import q2s3 from '~/assets/SocialStory/SocialStory3/q2s3.png';
import q3s3 from '~/assets/SocialStory/SocialStory3/q3s3.png';

// ✅ Map ảnh theo từng story
const imageMap = {
  'control-your-anger': { q1s1, q2s1, q3s1 },
  'potty-training': { q1s2, q2s2, q3s2 },
  'say-hi-and-goodbye': { q1s3, q2s3, q3s3 }
};


// ✅ Import câu hỏi JSON
import q1 from '~/assets/SocialStory/SocialStory1/questions1.json';
import q2 from '~/assets/SocialStory/SocialStory2/questions2.json';
import q3 from '~/assets/SocialStory/SocialStory3/questions3.json';

const questionMap = {
  'control-your-anger': q1,
  'potty-training': q2,
  'say-hi-and-goodbye': q3
};

const StoryQuestion = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const closeBtnRef = useRef(null);

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [grade, setGrade] = useState(0);
  const [direction, setDirection] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [runConfetti, setRunConfetti] = useState(false);
  const [loading, setLoading] = useState(true);

  const DataGrade = [
    "You did not use a calm choice today. Let’s try again tomorrow.",
    "You stayed calm 1 time today. Let’s keep practicing!",
    "Well done! You stayed calm 2 out of 3 times today.",
    "Great job! You stayed calm 3 out of 3 times today."
  ];

  useEffect(() => {
    const data = questionMap[slug];
    if (data) {
      setQuestions(data.questions || []);
    } else {
      console.error('❌ Không tìm thấy file câu hỏi cho slug:', slug);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus();
      document.body.style.overflow = 'hidden';
      onSound(DataGrade[grade]);
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleGrade = (correct) => {
    if (correct) {
      setGrade((g) => g + 1);
      setRunConfetti(true);
    }
  };

  const handleAnswer = () => {
    if (waiting) return;
    setWaiting(true);
    setTimeout(() => {
      if (index < questions.length - 1) {
        setSelected(null);
        setDirection(1);
        setIndex((i) => i + 1);
      } else {
        setOpen(true);
        setRunConfetti(true);
      }
      setWaiting(false);
    }, 5000);
  };

  const onSound = async (text) => {
    try {
      const response = await ttsFunction({ text, gender: 'male' });
      const audioBlob = new Blob([response], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      new Audio(audioUrl).play();
    } catch (err) {
      console.warn('Không phát được âm thanh:', err);
    }
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 })
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const q = questions[index];
  if (!q) return null;

  return (
    <Container disableGutters maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ width: '10%', minWidth: 240, borderRight: '1px solid #e0e0e0' }}>
          <SideBar />
        </Box>

        <Box
          sx={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 6,
            px: 2,
            background: 'linear-gradient(180deg, #f8fafc 0%, #eef1f6 100%)',
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={{
                enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0, scale: 0.95 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{
                width: '100%',
                maxWidth: 800,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                backgroundColor: '#fff',
                padding: '2rem 3rem',
                borderRadius: 20,
                boxShadow: '0px 8px 20px rgba(0,0,0,0.08)',
              }}
            >
              {/* Câu hỏi */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: '#2b3674' }}>
                  {q.question}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {q.meaningQ}
                </Typography>
              </Box>

              {/* Hình minh họa */}
              <motion.img
                src={imageMap[slug]?.[q.image.replace('.png', '')]}
                alt="question"
                style={{
                  maxWidth: '60%',
                  maxHeight: '40vh',
                  borderRadius: 16,
                  boxShadow: '0px 6px 15px rgba(0,0,0,0.1)',
                  objectFit: 'contain',
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />

              <ConfettiEffect run={runConfetti} duration={3000} onDone={() => setRunConfetti(false)} />

              {/* Câu trả lời */}
              {['A', 'B', 'C'].map((opt) => {
                const isSelected = selected === opt;
                const isCorrect = q[`ans${opt}`];
                return (
                  <Button
                    key={opt}
                    fullWidth
                    variant={isSelected ? 'contained' : 'outlined'}
                    color={
                      isSelected ? (isCorrect ? 'success' : 'error') : 'primary'
                    }
                    startIcon={
                      isSelected
                        ? isCorrect
                          ? '✅'
                          : '❌'
                        : null
                    }
                    sx={{
                      mt: 1,
                      maxWidth: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 500,
                      transition: '0.3s',
                      backgroundColor: isSelected
                        ? isCorrect
                          ? '#4caf50'
                          : '#e57373'
                        : '#f5f7fb',
                      color: isSelected ? '#fff' : '#2b3674',
                      '&:hover': {
                        backgroundColor: isSelected
                          ? isCorrect
                            ? '#43a047'
                            : '#ef5350'
                          : '#e3e7f0',
                      },
                    }}
                    onClick={() => {
                      setSelected(opt);
                      onSound(q[`feedback${opt}`]);
                      handleGrade(q[`ans${opt}`]);
                      handleAnswer();
                    }}
                    disabled={waiting}
                  >
                    {q[opt]} <br />{' '}
                    <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                      {q[`meaning${opt}`]}
                    </Typography>
                  </Button>
                );
              })}

              {waiting && (
                <Typography variant="body2" color="text.secondary" mt={2}>
                  ⏳ Wait for the next question ...
                </Typography>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

      </Box>
      <Footer />
    </Container>
  );
};

export default StoryQuestion;
