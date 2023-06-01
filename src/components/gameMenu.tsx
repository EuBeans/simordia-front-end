import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Typography,
  Chip,
  MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
  List
} from "@mui/material";
import {theme} from "../assets/theme";
import {GameCreateInput, GameLevel, GameMode, GameTheme} from "../model/gameModel";
import { useAppDispatch, useAppSelector } from "../utils/useAppDispatch";
import { createGameAction, setCurrentGameRoundTime } from "../redux/actions/gameSlice";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { setRoundPause } from "../redux/actions/gameRoundSlice";


// define word set theme enum
const WordSetThemes = Object.freeze([
    "sports",
    "animals",
    "fruits",
    "vegetables",
    "food",
    "clothes",
    "colors",
    "body",
    "family",
    "jobs",
    "transport",
    "weather",
    "house",
    "furniture",
    "kitchen",
    "school",
    "office",
    "holidays",
    "countries",
    "cities",
    "science",
    "history",
  ]);

const DEFAULT_TIMER_DURATION : Dayjs = dayjs().minute(2).second(30) ;
const DEFAULT_ROUNDS = 3;
const DEFAULT_GAME_MODE = "timed";
const DEFAULT_DIFFICULTY = 1;
const DEFAULT_THEME = "sports";
const GameMenu = () => {
    const [gameMode, setGameMode] = useState(DEFAULT_GAME_MODE);
    const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
    const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME);
    const [rounds, setRounds] = useState<number>(DEFAULT_ROUNDS);
    const [duration, setDuration] = useState<number>(0);

    const dispatch = useAppDispatch();
    
    const handleGameModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGameMode(event.target.value);
    };

    const handleDifficultyChange = (event: Event, value: number | number[]) => {
        setDifficulty(value as number);
    };



    const handleGameStart = () => {
 
        let gameLevel: GameLevel = GameLevel.EASY;

        if (difficulty === 1) {
            gameLevel = GameLevel.EASY;
        } else if (difficulty === 2) {
            gameLevel = GameLevel.MEDIUM;
        } else if (difficulty === 3) {
            gameLevel = GameLevel.HARD;
        }

        const game: GameCreateInput = {
            game_mode: gameMode as GameMode,
            game_level: gameLevel,
            theme: selectedTheme as GameTheme,
            max_round_number: rounds,
        }

        if (gameMode === "timed") {
            dispatch(setCurrentGameRoundTime(duration));
        }
        dispatch(createGameAction(game));
        dispatch(setRoundPause(false))

    };
    const handleThemeClick = (event: string) => {
        setSelectedTheme(event);
    };

    const handleRoundsChange = (event: SelectChangeEvent<number>) => {
        setRounds(event.target.value as number);
    };

    const handleDurationChange = (event:Dayjs  | null) => {
        if(event === null) return;
        const minutes = event.minute() | 0;
        const seconds = event.second();
        const duration = minutes * 60 + seconds;
        setDuration(duration);
    };

    const renderMenuItems = () => {
        const items = [];
    
        for (let i = 1; i <= 5; i++) {
          items.push(
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          );
        }
    
        return items;
    };
    
    const getChipColor = (themeChosen: string) => {
        const index = WordSetThemes.indexOf(themeChosen);

        if( index % 3 === 0) {
            return theme.palette.quadrary;
        } else if( index % 3 === 1) {
            return theme.palette.secondary  ;
        } else if( index % 3 === 2) {
            return theme.palette.thirdary;
        } 
        
        return theme.palette.thirdary;
    };


    const gameContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    };


    const menuContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    };

    
    const menuRowContainerStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        color: theme.palette.text.primary,
        marginBottom: "2vh",
      };

    const titleContainerStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.text.primary,
      };


    const header1Style = {
        fontFamily: theme.typography.fontFamily2,
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        color: theme.palette.text.primary,
        textAlign: "center",
    };

    const header2Style = {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.h3.fontSize,
        color: theme.palette.text.primary,
        textAlign: "center",
        marginBottom: "5px",

    };
    const header3Style = {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.h6.fontSize,
        color: theme.palette.text.primary,
        textAlign: "center",
    }


    const StartGameButtonStyle = {
        fontFamily: theme.typography.fontFamily2,
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.h1.fontWeight,
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
    }

    const difficultySliderStyle = {
        color: theme.palette.primary.light,
        
        marginLeft: "5px",
        height: 8,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-thumb': {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiSlider-valueLabel': {
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.primary.main,
            lineHeight: 1.2,
            fontSize: 10,
            fontWeight: 800,
            background: 'unset',
            padding: 0,
            width: 40,
            height: 40,
            borderRadius: '50% 50% 50% 0%',
            backgroundColor: theme.palette.primary.light,
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&:before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },


    };
    const radioStyle = {
        color: theme.palette.quadrary.main,
        '&, &.Mui-checked': {
            color: theme.palette.quadrary.main,
        },
    };

    const selectStyle = {
        color: theme.palette.quadrary.main,
        width: "calc( 100px)",
        '& .MuiSelect-select': {
            color: theme.palette.quadrary.main,
        },
        '& .MuiSelect-icon': {
            color: theme.palette.quadrary.main,
        },
        //change border color
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.quadrary.main,
        },
        //change border color when focused
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.quadrary.main,
        },
        //change border color when focused
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.quadrary.main,
        },
        ml: 2,


    }

    const TimePickerStyle = {
        color: theme.palette.quadrary.main,
        width: "calc( 80px)",
        borderColor: theme.palette.quadrary.main,
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.quadrary.main,
        },

        //text color
        '& .MuiInputBase-input': {
            color: theme.palette.quadrary.main,
        },

        //change border color when focused
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.quadrary.main,
        },
        
    }

    const TimePickerInputStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.quadrary.main,
    }



    const getLabel = () => {
        switch (difficulty) {
          case 1:
            return "Easy";
          case 2:
            return "Medium";
          case 3:
            return "Hard";
          default:
            return "";
        }
      };

    return (
        <Grid sx={gameContainerStyle}>
            <Grid container sx={menuRowContainerStyle}>
                <Typography sx={header1Style}>Welcome to Simordia</Typography>
            </Grid>
            <Grid  container sx={menuContainerStyle}>
                
                <Grid container sx={menuRowContainerStyle}>
                    <Grid container  sx ={titleContainerStyle}>
                        <Typography sx={header2Style}>Game Mode</Typography>
                    </Grid>
                    <FormControl component="fieldset"  >
                            <RadioGroup
                                row
                                aria-label="game mode"
                                name="gameMode"
                                value={gameMode}
                                onChange={handleGameModeChange}
                            >
                            <FormControlLabel value="timed"  sx={header3Style} control={<Radio sx={radioStyle}/>} label="Timed" />
                            <FormControlLabel value="multiplayer" sx={header3Style}  control={<Radio sx={radioStyle}/>} label="Multiplayer" disabled />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid container sx={menuRowContainerStyle}>
                    <FormControl component="fieldset" sx={{ width: '80%' }}>
                        <FormLabel component="legend" sx={header2Style}>Difficulty</FormLabel>
                        <Slider
                            value={difficulty}
                            onChange={handleDifficultyChange}
                            aria-labelledby="pretto slider"
                            valueLabelDisplay="auto"
                            valueLabelFormat={getLabel}
                            step={1}
                            marks
                            min={1}
                            max={3}
                            sx={difficultySliderStyle}
                        />
                    </FormControl>
                </Grid>
                <Grid container sx={menuRowContainerStyle}>
                    <Grid container  sx ={titleContainerStyle}>
                        <Typography sx={header2Style}>Settings</Typography>
                    </Grid>

                    <FormControl variant="outlined">
                    <Typography id="number-of-rounds-label" sx={header3Style}># of Rounds:</Typography>

                        <Select
                            labelId="number-of-rounds-label"
                            id="number-of-rounds-select"
                            value={rounds}
                            onChange={handleRoundsChange}
                            sx={selectStyle}
                        >
                            {renderMenuItems()}
                        </Select>
                    </FormControl>

                    <Grid sx={TimePickerInputStyle}>
                        <Typography id="number-of-rounds-label" sx={header3Style}>Duration:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker 
                                    sx={TimePickerStyle}
                                    views={['minutes', 'seconds']}
                                    format="mm:ss"
                                    value={DEFAULT_TIMER_DURATION}
                                    onChange={handleDurationChange}
                                    /> 
                            </LocalizationProvider>
                    </Grid>

                </Grid>

                <Grid container sx={menuRowContainerStyle}>
                    <Grid container  sx ={titleContainerStyle}>
                        <Typography sx={header2Style}>Theme</Typography>
                    </Grid>
                        {WordSetThemes.map((themeSet) => (
                            <Chip
                            key={themeSet}
                            label={themeSet}
                            clickable
                            onClick={() => handleThemeClick(themeSet)}
                            style={{
                                margin: "8px",
                                backgroundColor: getChipColor(themeSet)?.main,
                                color: getChipColor(themeSet)?.text,
                                //if selected, add border
                                border: themeSet === selectedTheme ? "2px solid" : "none",
                                // scale if selected
                                transform: themeSet === selectedTheme ? "scale(1.3)" : "scale(1)",
                                transition: "transform 0.2s",
                                //box shadow if selected, black background
                                boxShadow: themeSet === selectedTheme ? "0px 0px 10px 0px rgba(0,0,0,0.75)" : "none",
                                
                            }}
                            />
                        ))}
                    
                </Grid>

                <Grid container sx={menuRowContainerStyle}>

                    <Button variant="contained" sx={StartGameButtonStyle} onClick={handleGameStart}>
                        Start Game
                    </Button>
                </Grid>

                
            </Grid>
          


        </Grid>
    )
}       

export default GameMenu