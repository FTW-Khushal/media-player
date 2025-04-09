import Box from "@mui/material/Box";
import React from "react";
import AlbumItem from "../listItem/AlbumItem";
import playlists from "../../data/playlists.json";
import Grid from "@mui/material/Grid";
import AudioPlayer from "../../AudioPlayer";
import { Album } from "../../types/Album";

const AlbumList: React.FC = () => {
  const [selectedPlaylist, setSelectedPlayList] = React.useState<Album | null>(null);


  const albums: Album[] = playlists.playlists.map((playlist) => ({
    ...playlist,
    artist: playlist.artist || playlist["artist:"],
  }));


  return (
    <Box sx={{ backgroundColor: "black", height: "90vh" }}>
      
      <Grid container spacing={2} p={2}>
        {albums.map((album, index) => (
          <Grid  key={index}  onClick={() => setSelectedPlayList(album)}>
            
            <AlbumItem album={album} />
          </Grid>
        ))}
        
      </Grid>
      {selectedPlaylist && (
            <AudioPlayer album={selectedPlaylist} />)}
    </Box>
  );
};

export default AlbumList;
