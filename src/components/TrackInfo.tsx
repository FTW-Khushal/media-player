import React from 'react';
import { Track } from '../types/Track';
import { Box, Stack, Typography } from '@mui/material';
import AlbumCover from './AlbumCover';

interface TrackInfoProps {
  track: Track;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ track }) => {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <AlbumCover title={track.name} size={64} />
        <Stack>
          <Typography variant='subtitle1' color='white' >{track.name}</Typography>
          <Typography variant='subtitle2' color='white' className="text-gray-400">{track.artist}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TrackInfo;
