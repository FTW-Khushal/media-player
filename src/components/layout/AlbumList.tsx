import Box from "@mui/material/Box";
import React from "react";
import AlbumItem from "../listItem/AlbumItem";
import playlists from "../../data/playlists.json";
import Grid from "@mui/material/Grid";
import AudioPlayer from "../../AudioPlayer";
import { Album } from "../../types/Album";

const AlbumList: React.FC = () => {
  const [selectedPlaylist, setSelectedPlayList] = React.useState<Album | null>(null);

  const sanitizePlaylists = (data: Album[]) => {
    return data.playlists.map((playlist: Album) => ({
      ...playlist,
      artist: playlist["artist:"], // Map "artist:" to "artist"
      tracks: playlist.tracks, // Keep tracks as is
    }));
  };

  const albums: Album[] = sanitizePlaylists(playlists);


  return (
    <Box sx={{ backgroundColor: "black", height: "90vh" }}>
      
      <Grid container spacing={2} p={2}>
        {albums.map((album, index) => (
          <Grid  key={index} xs={12} sm={6} md={4} lg={3} onClick={() => setSelectedPlayList(album)}>
            
            <AlbumItem album={album} index={index} />
          </Grid>
        ))}
        
      </Grid>
      {selectedPlaylist && (
            <AudioPlayer album={selectedPlaylist} />)}
    </Box>
  );
};

export default AlbumList;
