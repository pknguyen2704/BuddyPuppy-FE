import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, IconButton, Container } from '@mui/material'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowBackIos, ArrowForwardIos, VolumeUp } from '@mui/icons-material'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import SideBar from '~/components/SideBar/SideBar'
import {Button} from '@mui/material'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useNavigate } from 'react-router-dom'
// PDF + JSON data
import pdf1 from '~/assets/SocialStory/SocialStory1/story1.pdf'
import pdf2 from '~/assets/SocialStory/SocialStory2/story2.pdf'
import pdf3 from '~/assets/SocialStory/SocialStory3/story3.pdf'

import json1 from '~/assets/SocialStory/SocialStory1/story1.json'
import json2 from '~/assets/SocialStory/SocialStory2/story2.json'
import json3 from '~/assets/SocialStory/SocialStory3/story3.json'

const pdfMap = {
  'control-your-anger': { pdf: pdf1, json: json1 },
  'potty-training': { pdf: pdf2, json: json2 },
  'say-hi-and-goodbye': { pdf: pdf3, json: json3 }
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const SocialStoryContent = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(null)
  const [pageData, setPageData] = useState([])
  const [playingIndex, setPlayingIndex] = useState(null)
  const containerRef = useRef(null)

  const storyData = pdfMap[slug]
  const pdfFile = storyData?.pdf
  const jsonData = storyData?.json

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages)

  useEffect(() => {
    if (jsonData) setPageData(jsonData.pages || [])
    setPageNumber(1)
  }, [jsonData])

  const nextPage = () => setPageNumber((p) => Math.min(p + 1, numPages))
  const prevPage = () => setPageNumber((p) => Math.max(p - 1, 1))

  const playAudio = (text, idx) => {
    setPlayingIndex(idx)
    console.log(`🎵 Play audio for: ${text}`)
    // const audio = new Audio(`/audio/${slug}/${pageNumber}/${text}.mp3`)
    // audio.play()
    // audio.onended = () => setPlayingIndex(null)
    setTimeout(() => setPlayingIndex(null), 1500) // demo effect
  }

  const currentPage = pageData.find((p) => p.page === pageNumber)

  // Gốc PDF (16:9)
  const BASE_WIDTH = 1600
  const BASE_HEIGHT = 900

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f6fa'
      }}
    >
      <Header />

      <Box sx={{ display: 'flex', flexGrow: 1, height: (theme) => theme.BuddyPuppy.appContentHeight }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: '10%',
            minWidth: 240,
            borderRight: '1px solid #e0e0e0'
          }}
        >
          <SideBar />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: 'bold', textTransform: 'capitalize' }}
          >
            {slug.replace(/-/g, ' ')}
          </Typography>

          <Box
            ref={containerRef}
            sx={{
              position: 'relative',
              aspectRatio: '16/9',
              width: '80%',
              maxWidth: 1600,
              backgroundColor: '#fff',
              borderRadius: 3,
              boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Nút Prev */}
            <IconButton
              onClick={prevPage}
              disabled={pageNumber <= 1}
              sx={{
                position: 'absolute',
                left: 16,
                backgroundColor: '#ffffffcc',
                '&:hover': { backgroundColor: '#fff' },
                boxShadow: 2,
                zIndex: 3
              }}
            >
              <ArrowBackIos />
            </IconButton>

            {/* PDF Viewer */}
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={pageNumber}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={containerRef.current?.offsetWidth || 1280}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </motion.div>
              </AnimatePresence>
            </Document>

            {/* Hiển thị nút Exam khi đến trang cuối */}
            {pageNumber === numPages && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 4
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#f0932b',
                    color: 'white',
                    // backgroundColor: '#22a6b3',
                    // color: '#fff',
                    '&:hover': { backgroundColor: '#f0932b', color: 'white'},
                    boxShadow: 3,
                    // borderRadius: '8px',
                    // px: 2,
                    // py: 1,
                    // fontSize: '0.9rem',
                    // textTransform: 'none'
                  }}
                  onClick={() => navigate(`/exam/${slug}`)}
                >
                  Exam
                </Button>
              </Box>
            )}

            {currentPage?.lines?.map((line, idx) => (
              <motion.div
                key={idx}
                animate={playingIndex === idx ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.6, repeat: playingIndex === idx ? Infinity : 0 }}
                style={{
                  position: 'absolute',
                  top: `${((BASE_HEIGHT - (line.y0 + line.height / 2)) / BASE_HEIGHT) * 100}%`,
                  left: `${((line.x1 + 15) / BASE_WIDTH) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2
                }}
              >
                <IconButton
                  onClick={() => playAudio(line.text, idx)}
                  sx={{
                    backgroundColor: '#fff',
                    '&:hover': { backgroundColor: '#f6e58d' },
                    boxShadow: 2,
                    width: 28,
                    height: 28,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <VolumeUp fontSize="small" sx={{ color: '#f0932b' }} />
                </IconButton>
              </motion.div>
            ))}

            {/* Nút Next */}
            <IconButton
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              sx={{
                position: 'absolute',
                right: 16,
                backgroundColor: '#ffffffcc',
                '&:hover': { backgroundColor: '#fff' },
                boxShadow: 2,
                zIndex: 3
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            {/* Số trang */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                backgroundColor: '#00000080',
                color: '#fff',
                borderRadius: '16px',
                px: 2,
                py: 0.5,
                fontSize: '0.9rem',
                zIndex: 3
              }}
            >
              Page {pageNumber} / {numPages || '?'}
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Container>
  )
}

export default SocialStoryContent
