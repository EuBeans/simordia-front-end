import * as React from 'react';
import {useState} from 'react';
import { Grid, List, ListItem} from '@mui/material';
import DistanceBar from './distanceBar';
import { getAllRoundWords} from '../redux/selector/roundWordSelector';
import { useAppSelector } from '../utils/useAppDispatch';
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
        //set height the parent container
        height: "100%",
        paddingTop: "10px",
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
    


