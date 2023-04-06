import LinearProgress from "@mui/material/LinearProgress";
import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { theme } from '../assets/theme';
import { makeStyles, styled } from "@mui/material/styles";

import { useState, useEffect } from 'react';

function BoxTimer(
    props: { time: number, progress: number },
  ) {
  
      const { time, progress = 0.01} = props;
    
    const width = 200;
    const height = 300;
     // format time
      const formatTime = (time: number) => {
          const minutes = Math.floor(time / 60);
          let seconds: string | number = time % 60;
          if (seconds < 10) {
              seconds = `0${seconds}`;
          }
          return `${minutes}:${seconds}`;
      };
  
  
      const getCounterColor = (time: number) => {
          if (time < 10) {
              return theme.palette.error.main;
          }
          else if (time < 30) {
              return theme.palette.warning.main;
          }
          else {
              return theme.palette.success.main;
          }
      }
  
      const getTextColor = (time: number) => {
          if (time < 10) {
              if (time % 2 === 0) {
                  return theme.palette.error.main;
              }
              else {
                  return theme.palette.primary.light;
              }
          }
          else if (time < 30) {
              return theme.palette.warning.main;
          }
          else {
              return theme.palette.primary.light;
          }
      }
  
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [right, setRight] = useState(0);

    useEffect(() => {
        const totalLength = width * 2 + height * 2;
        const progressLength = totalLength ;
        console.log('progressLength', totalLength)
        let currentLength = 0;

        const interval = setInterval(() => {
        if (currentLength >= progressLength) {
            clearInterval(interval);
            return;
        }
        
        if (currentLength < height) {
            setTop(currentLength);
        } else if (currentLength < height + width) {
            setLeft(currentLength - height);
            setTop(width);
        } else if (currentLength < width + height * 2  ) {
            setBottom(height - (currentLength - width - height));
            setLeft(width);
        } else {
            setRight(width - (currentLength - height * 2 - width));
            setBottom(0);
        }

        currentLength++;
        }, 10);

        return () => clearInterval(interval);
    }, [progress, width, height]);

    return (
        <Box sx={{ position: 'relative', width, height }}>
        <Box
            sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 10,
            height: top,
            bgcolor: 'red',
            }}
        />

        <Box
            sx={{
            position: 'absolute',
            top: top ,
            left: 0,
            width: left,
            height: 10,
            bgcolor: 'blue',
            }}
        />
        <Box
            sx={{
            position: 'absolute',
            bottom: height  ,
            right: 0,
            width: 10,
            height: -bottom,
            bgcolor: 'green',
        }}
        />
        
        <Box
            sx={{
            position: 'absolute',
            bottom: height ,
            left: 0,
            width: right,
            height: 10,
            bgcolor: 'yellow',
            }}
        />

        </Box>
    );
}

export default BoxTimer;
