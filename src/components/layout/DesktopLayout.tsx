import React from "react";
import { Track } from "../../types/Track";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import AlbumCover from "../AlbumCover";
import PlaylistQueue from "../PlaylistQueue";
import { Album } from "../../types/Album";

interface DesktopLayoutProps {
  track: Track;
  playlist: Track[];
  currentIndex: number;
  handleSelectTrack: (index: number) => void;
  album: Album;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  track,
  playlist,
  currentIndex,
  handleSelectTrack,
  album,
}) => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ height: "90vh" }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: { xs: "50vh", md: "100%" },
              padding: { xs: 2, md: 0 },
            }}
          >
            <AlbumCover title={track.name} size={256} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} >
          <Box
            padding={2}
            sx={{
              height: "100%",
              overflowY: "auto",
              maxHeight: { xs: "40vh", md: "100%" },
            }}
          >
            <Stack>
              <Typography variant="h2" color="white">
                {album.name}
              </Typography>
              <Typography variant="subtitle2" color="gray">
                {track.artist} - {album.year}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Stack>

            <PlaylistQueue
              playlist={playlist}
              currentIndex={currentIndex}
              onSelectTrack={handleSelectTrack}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DesktopLayout;
