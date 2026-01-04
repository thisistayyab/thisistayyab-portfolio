import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  Drawer,
  MenuItem,
  Divider
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import logo from '../assets/favicon.png';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: '20px',
  backdropFilter: 'blur(20px)',
  border: '1px solid',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)',
  padding: '12px 20px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
    opacity: 0.6,
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

export default function AppAppBar() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#project' },
    { label: 'Testimonials', href: '#client' },
    { label: 'Experience', href: '#experience' },
    { label: 'Services', href: '#service' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 'calc(var(--template-frame-height, 0px) + 28px)',
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters >
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Tayyab's Logo"
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: 2,
                    boxShadow: 1,
                    cursor: 'pointer',
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontSize: 17,
                    display: 'block',
                    background: 'linear-gradient(135deg, #ffffff, #94a3b8, #60a5fa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ayyab's Portfolio
                </Typography>
              </motion.div>

              {/* Desktop Nav */}
              <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' }, ml: 4, gap: 2 }}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    whileHover={{ y: -2 }}
                  >
                    <Button
                      href={item.href}
                      variant="text"
                      size="large"
                      disableRipple
                      sx={{
                        position: 'relative',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textTransform: 'none',
                        px: 2,
                        py: 1,
                        backgroundColor: 'transparent',
                        borderRadius: '10px',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          color: 'white',
                          transform: 'translateY(-2px)',
                        },
                        '&:hover .underline': {
                          width: '100%',
                        },
                      }}
                    >
                      {item.label}
                      <Box
                        className="underline"
                        sx={{
                          position: 'absolute',
                          bottom: 4,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          height: '2px',
                          width: 0,
                          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: '2px',
                        }}
                      />
                    </Button>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Mobile Nav */}
            <Box sx={{ display: { xs: 'flex',sm:'none', md: 'none' } }}>
              <motion.div
                whileTap={{ scale: 0.9 }}
              >
                <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              </motion.div>
              <Drawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{ sx: { top: 'var(--template-frame-height, 0px)' } }}
              >
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ p: 2, backgroundColor: '#0b0c10', height: '100vh' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <IconButton onClick={toggleDrawer(false)} sx={{ color: '#fff' }}>
                              <CloseRoundedIcon />
                            </IconButton>
                          </motion.div>
                        </Box>
                        {navItems.map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            whileHover={{ x: 10 }}
                          >
                            <MenuItem 
                              component="a" 
                              href={item.href} 
                              sx={{ color: '#fff' }} 
                              onClick={toggleDrawer(false)}
                            >
                              {item.label}
                            </MenuItem>
                          </motion.div>
                        ))}
                        <Divider sx={{ my: 3, borderColor: '#333' }} />
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Drawer>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </motion.div>
  );
}
