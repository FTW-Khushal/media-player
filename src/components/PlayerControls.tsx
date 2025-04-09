import { Shuffle } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RepeatIcon from '@mui/icons-material/Repeat';

interface PlayerControlsProps {
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  isRepeat,
  isShuffle,
  onPlayPause,
  onNext,
  onPrev,
  onToggleRepeat,
  onToggleShuffle,
}) => (

  <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center" }}>
    <IconButton onClick={onToggleShuffle}>
      <Shuffle fontSize="inherit" sx={{ color: isShuffle ? "red" : "white" }} />
    </IconButton>

    <IconButton onClick={onPrev}>
      <SkipPreviousIcon fontSize="inherit" sx={{ color:  "white" }} />
    </IconButton>

    <IconButton aria-label="play-pause" onClick={onPlayPause} sx={{ fontSize: 56 }}>
      {isPlaying ? (
        <PauseIcon fontSize="inherit" sx={{ color: "white" }} />
      ) : (
        <PlayArrowIcon fontSize="inherit" sx={{ color: "white" }} />
      )}
    </IconButton>

    <IconButton onClick={onNext}>
      <SkipNextIcon fontSize="inherit" sx={{ color:  "white" }} />
    </IconButton>

    <IconButton onClick={onToggleRepeat}>
      <RepeatIcon fontSize="inherit" sx={{ color: isRepeat ? "red" : "white" }} />
    </IconButton>
  </Box>
);

export default PlayerControls;
