import * as React from 'react';
import {theme} from '../assets/theme';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import {getCurrentGame, getCurrentScore} from '../redux/selector/gameSelector';
import { useAppSelector } from '../utils/useAppDispatch';
import {getAllGameRounds} from '../redux/selector/gameRoundSelector';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//props
interface GameScoreBoardProps {
    open: boolean;
    handleClose: () => void;
}

export default function GameScoreBoard(props: GameScoreBoardProps) {
    const {open, handleClose} = props;

    const currentGame = useAppSelector(getCurrentGame);
    const currentGameScore = useAppSelector(getCurrentScore);
    const allGameRounds = useAppSelector(getAllGameRounds);

    

    React.useEffect(() => {
        if(open){

            console.log('currentGameScoreState', currentGameScore)
            console.log('allGameRoundsState', allGameRounds)
            console.log('currentGameState', currentGame)
        }
    }, [open, currentGameScore, allGameRounds, currentGame]);
        

    const scoreBoardTitle = {
        color: theme.palette.quadrary.light,
        fontWeight: theme.typography.h1.fontWeight,
        fontSize: theme.typography.h1.fontSize,
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily2,
        
    }
    const EndGameButtonStyle = {
        fontFamily: theme.typography.fontFamily2,
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        color: theme.palette.quadrary.main,
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
        border: '1px solid',
        borderColor: theme.palette.quadrary.main,
        //hover
        '&:hover': {
            backgroundColor: theme.palette.quadrary.main,
            color: theme.palette.background.paper,
        },
        //center the button
        margin: 'auto',
    }

    const tableContainer = {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.default,
        border: '1px solid',
        borderColor: theme.palette.quadrary.main,

    }

    const tableCellHeader = {
        color: theme.palette.quadrary.dark,
        fontWeight: theme.typography.h4.fontWeight,
        fontSize: theme.typography.h5.fontSize,
        fontFamily: theme.typography.fontFamily,
        borderColor: theme.palette.quadrary.main,

    }

    const tableCell = {
        color: theme.palette.text.primary,
        borderColor: theme.palette.quadrary.main,
        fontWeight: theme.typography.body1.fontWeight,
        fontSize: theme.typography.h3.fontSize,

    }

    const informationHeader = {
        color: theme.palette.quadrary.text,
        fontWeight: theme.typography.h2.fontWeight,
        fontSize: theme.typography.h2.fontSize,
        fontFamily: theme.typography.fontFamily2,
        borderColor: theme.palette.quadrary.main,
        textAlign: 'center',
    }

    const informatioRowContainer = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        px: 2,
        py: 2,
    }
    const generateScoreBoard = () => {
        if(currentGame && allGameRounds){
            return (
                <TableContainer component={Paper} sx={tableContainer}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell sx={tableCellHeader} >Round Number</TableCell>
                            <TableCell sx={tableCellHeader} align="center">Round Word</TableCell>
                            <TableCell sx={tableCellHeader} align="center">Number of Guesses</TableCell>
                            <TableCell sx={tableCellHeader} align="center">Round Status</TableCell>
                            <TableCell sx={tableCellHeader} align="center">Score</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {allGameRounds.map((row) => (
                            <TableRow
                                key={row.round_number}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={tableCell} component="th" scope="row">
                                    {row.round_number}
                                </TableCell>
                                <TableCell sx={tableCell} align="center">{row.round_word}</TableCell>
                                <TableCell sx={tableCell} align="center">{row.number_of_guesses}</TableCell>
                                <TableCell sx={tableCell} align="center">{row.status}</TableCell>
                                <TableCell sx={tableCell} align="center">{row.round_score}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    return (
   
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            fullWidth = {true}
            PaperProps={
                {
                    style: {
                        backgroundColor: theme.palette.background.default,
                        border: '1px solid',
                        borderColor: theme.palette.quadrary.main,
                        borderRadius: 20,
                    }
                }
            }
        >
            <DialogTitle id="alert-dialog-title" sx={scoreBoardTitle}>
                {"Score Board"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid sx ={informatioRowContainer}>
                        <Typography sx={informationHeader}>Score: {currentGameScore}</Typography>
                        <Typography sx={informationHeader}>Difficulty: {currentGame?.game_level}</Typography>
                        <Typography sx={informationHeader}>Game Mode: {currentGame?.game_mode}</Typography>
                    </Grid> 



                    {generateScoreBoard()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={EndGameButtonStyle} autoFocus>
                    Close 
                </Button>
            </DialogActions>
        </Dialog>
      
    );
}
    


