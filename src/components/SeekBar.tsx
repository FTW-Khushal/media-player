import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (value: number) => void;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const SeekBar: React.FC<SeekBarProps> = ({ currentTime, duration, onSeek }) => (
<Stack direction="row" spacing={2} alignItems="center">
  <Typography variant="body2" color='white'>{formatTime(currentTime)}</Typography>

  <Slider
    size="small"
    min={0}
    max={duration}
    step={0.1}
    value={currentTime}
    onChange={(e, value) => onSeek(typeof value === 'number' ? value : value[0])}

  />

  <Typography variant="body2" color='white'>{formatTime(duration)}</Typography>
</Stack>
);

export default SeekBar;