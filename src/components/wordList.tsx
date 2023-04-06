import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {theme} from '../assets/theme';
import { Grid, List, ListItem, ListItemText, styled, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import DistanceBar from './distanceBar';
import { getAllRoundWords} from '../redux/selector/roundWordSelector';
import { useAppDispatch, useAppSelector } from '../utils/useAppDispatch';
import { RoundWord } from '../model/roundWordModel';

const MAX_DISTANCE = 700;
export default function WordList() {

    const allCurrentRoundWords = useAppSelector(getAllRoundWords);

    const [words, setWords] = useState([] as RoundWord[]);

    React.useEffect(() => {

        const sortedArray = allCurrentRoundWords.slice().sort((a,b) => a.distance - b.distance);
        setWords(sortedArray);
            
        

    }, [allCurrentRoundWords]);

    const ListBoxStyle = {
        width: "100%",
        height: "100%",
    }

    //render list of words, callback for words

    const renderWordBars = () => {
        return words.map((word) => (
            <ListItem key={word.word} >
                <DistanceBar word={word.word} distance={word.distance} maxDistance={MAX_DISTANCE}/>
            </ListItem>
        ))
    }

    return (
        <Grid sx={ListBoxStyle}>
            <List>
                {renderWordBars()}
            </List>
        </Grid>
    );
}
    


