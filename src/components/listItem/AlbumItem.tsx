import { Box, Typography } from '@mui/material';
import React from 'react';
import AlbumCover from '../AlbumCover';
import { Album } from '../../types/Album';
interface AlbumItemProps {
    album: Album
  }
  
const AlbumItem: React.FC<AlbumItemProps> = ({album}) => {
    return (
        <Box>
            <AlbumCover
                title={album.name}
                size={128}/>
            <Typography variant='subtitle1' color='white' >{album.name}</Typography>

        </Box>
    );
};

export default AlbumItem;