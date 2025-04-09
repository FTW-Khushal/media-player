import {
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Track } from "../../types/Track";
import AlbumCover from "../AlbumCover";
import SeekBar from "../SeekBar";
import PlayerControls from "../PlayerControls";
import PlaylistQueue from "../PlaylistQueue";

interface MobilePlayerProps {
  track: Track;
  currentTime: number;
  duration: number;
  handleSeek: (value: number) => void;
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  handlePlayPause: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  setIsRepeat: () => void;
  setIsShuffle: () => void;
  hideMobileView: () => void;
  playlist: Track[];
  currentIndex: number;
  handleSelectTrack: (index: number) => void;
}

const MobilePlayer: React.FC<MobilePlayerProps> = ({
  track,
  currentTime,
  duration,
  handleSeek,
  isPlaying,
  isRepeat,
  isShuffle,
  handlePlayPause,
  handleNext,
  handlePrev,
  setIsRepeat,
  setIsShuffle,
  hideMobileView,
  playlist,
  currentIndex,
  handleSelectTrack,
}) => {
  const [showList, setShowList] = useState(false);

  return (
    <Stack sx={{ backgroundColor: "default", height: "100vh" }}>
      <IconButton aria-label="down" size="large" onClick={hideMobileView}>
        <KeyboardArrowUpIcon
          fontSize="inherit"
          sx={{ color: "white" }}
        ></KeyboardArrowUpIcon>
      </IconButton>

      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <AlbumCover title={track.name} size={300} />
      </Box>

      <Box sx={{ padding: 2 }}>
        <Stack paddingTop={2} paddingBottom={2}>
          <Typography variant="h5" color="white">
            {track.name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="white"
            className="text-gray-400"
          >
            {track.artist}
          </Typography>
        </Stack>

        <SeekBar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />

        <PlayerControls
          isPlaying={isPlaying}
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onToggleRepeat={setIsRepeat}
          onToggleShuffle={setIsShuffle}
        />

        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={() => {
              setShowList(!showList);
            }}
          >
            NEXT
          </Button>
        </Box>
      </Box>

      <Collapse
        in={showList}
        timeout={300}
        unmountOnExit
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          zIndex: 1300, // Ensures it overlays other content
        }}
      >
        <Box sx={{ height: "100vh" }}>
          <Stack direction={"row"} alignItems="center" padding={2}>
            <IconButton
              aria-label="down"
              size="large"
              onClick={() => setShowList(false)}
            >
              <KeyboardArrowLeftIcon
                fontSize="inherit"
                sx={{ color: "white" }}
              ></KeyboardArrowLeftIcon>
            </IconButton>

            <Typography variant="h5" color="white" padding={2} flexGrow={1}>
              Playlist
            </Typography>
          </Stack>

          <PlaylistQueue
            playlist={playlist}
            currentIndex={currentIndex}
            onSelectTrack={handleSelectTrack}
          />
        </Box>
      </Collapse>
    </Stack>
  );
};

export default MobilePlayer;
