
import * as React from 'react';

import {useAppDispatch} from '../utils/useAppDispatch';
import Box from '@mui/material/Box';
import {theme} from '../assets/theme';
import { Grid, styled, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useAppSelector } from '../utils/useAppDispatch';
import {getCurrentRoundWord} from '../redux/selector/roundWordSelector';


export interface DistanceBarProps {
    word: string;
    distance: number;
    maxDistance: number;
}

function DistanceBar(props:DistanceBarProps) {

    const useDispatch = useAppDispatch();
    const currentRoundWord = useAppSelector(getCurrentRoundWord);
    
    const {word, distance, maxDistance} = props;
    let progress =  100 - (distance / maxDistance) * 100;

    if(progress < 5){
        progress = 5;
    }

    let color = theme.palette.sixtarary.light;
    if (progress > 20) {
        color = theme.palette.quadrary.main;
    }
    if (progress > 60) {
        color = theme.palette.secondary.main;
    }

    const WordTextStyle = {
        color: theme.palette.text.primary,
        fontSize: theme.typography.h5.fontSize,
        fontWeight: theme.typography.h5.fontWeight,
        fontFamily: theme.typography.fontFamily,
        ml: 3,
        mr: 4,
    }

 
    const ProgressBarStyle = {
        border: currentRoundWord?.word === word ?  "3px solid" : "none",
        borderRadius: "10px",
        width: "100%",
        backgroundColor: theme.palette.primary.light,
    }

    const BorderLinearProgress = styled(LinearProgress)(() => ({
      height: 36,
      borderRadius: 8,

      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.background.paper2,
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 8,
        backgroundColor:color ,
      },  
    }));
 

  return (
    <Grid sx={ProgressBarStyle}>
        <BorderLinearProgress  variant="determinate" value={progress}/>
        <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
        >
            <Typography sx={WordTextStyle} variant="body2">{word}</Typography>
        </Box>
        <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
        >
            <Typography sx={WordTextStyle} variant="body2">{distance}</Typography>
        </Box>
    </Grid>
  );
}

export default DistanceBar;