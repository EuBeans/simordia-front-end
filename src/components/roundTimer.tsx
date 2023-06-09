import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { theme } from '../assets/theme';

function RoundTimer(
  props: CircularProgressProps & { time: number, progress: number },
) {

    const { time, progress, ...other } = props;


   // format time
    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        let seconds: string | number = time % 60;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    };


    const getCounterColor = () => {
        if (progress < 10) {
            return theme.palette.error.main;
        }
        else if (progress < 30) {
            return theme.palette.warning.main;
        }
        else {
            return theme.palette.success.main;
        }
    }

    
    const getTextColor = () => {
        if (progress < 10) {
            if (time % 2 === 0) {
                return theme.palette.error.main;
            }
            else {
                return theme.palette.primary.light;
            }
        }
        else if (progress < 30) {
            return theme.palette.warning.main;
        }
        else {
            return theme.palette.primary.light;
        }
    }


    const timerStyle = {
        '& .MuiCircularProgress-circle': {
            color: getCounterColor(),
        },
    }

    const timerTextStyle = {
        fontFamily: theme.typography.fontFamily2,
        fontSize: theme.typography.h2.fontSize,
        color: getTextColor(),
        textAlign: "center",
    };


    return (
        <Box sx={{ position: 'relative', display: 'inline-flex'}}>
            <CircularProgress variant="determinate" value={progress} size="70px" sx={timerStyle}  />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    sx={timerTextStyle}
                    >{formatTime()}</Typography>
                </Box>
        </Box>
    );
}

export default RoundTimer;