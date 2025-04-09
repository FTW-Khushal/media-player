import React, { useEffect, useRef, useState } from "react";
import TrackInfo from "./components/TrackInfo";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import {
  Collapse,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import MobilePlayer from "./components/layout/MobilePlayer";
import { Album } from "./types/Album";
import { useTheme } from "@mui/material/styles";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Shuffle } from "@mui/icons-material";
import AlbumCover from "./components/AlbumCover";
import DesktopLayout from "./components/layout/DesktopLayout";

interface AudioPlayerProps {
  album: Album;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ album }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [volume, setVolume] = useState(1);
  const [showChild, setShowChild] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const currentTrack = {
    ...album.tracks[currentIndex],
    artist: album.artist,
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // audio.volume = volume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, isRepeat, isShuffle]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentIndex]);

  const handlePlayPause = () => setIsPlaying((prev) => !prev);
  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + album.tracks.length) % album.tracks.length
    );
  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * album.tracks.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex((prev) => (prev + 1) % album.tracks.length);
    }
  };

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };
  // Uncomment this if you want to add volume control
  // const handleVolumeChange = (value: number) => {
  //   setVolume(value);
  //   if (audioRef.current) {
  //     audioRef.current.volume = value;
  //   }
  // };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSelectTrack = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (

    <Box>
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />
      {isMobile && (
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              background: "#121212",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          >
            <Slider
              size="small"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              onChange={(event, value) =>
                handleSeek(typeof value === "number" ? value : (value as number[])[0])
              }
              sx={{ flexGrow: 1, padding: "0 !important", display: "block" }}
            />

            <Box
              onClick={() => {
                setShowChild(!showChild);
              }}
              sx={{
                padding: "0 0 4px 12px",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <TrackInfo track={currentTrack} />
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    aria-label="play-pause"
                    size="large"
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePlayPause();
                    }}
                  >
                    {isPlaying ? (
                      <PauseIcon fontSize="inherit" sx={{ color: "white" }} />
                    ) : (
                      <PlayArrowIcon
                        fontSize="inherit"
                        sx={{ color: "white" }}
                      />
                    )}
                  </IconButton>

                  <IconButton
                    aria-label="next"
                    size="large"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleNext();
                    }}
                  >
                    <SkipNextIcon fontSize="inherit" sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              </Stack>
            </Box>
          </Box>

          <Collapse
            in={showChild}
            timeout={300}
            unmountOnExit
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              backgroundColor: "black",
            }}
          >
            <MobilePlayer
              track={currentTrack}
              currentTime={currentTime}
              duration={duration}
              handleSeek={handleSeek}
              isPlaying={isPlaying}
              isRepeat={isRepeat}
              isShuffle={isShuffle}
              handlePlayPause={handlePlayPause}
              handleNext={handleNext}
              handlePrev={handlePrev}
              setIsRepeat={() => setIsRepeat((prev) => !prev)}
              setIsShuffle={() => setIsShuffle((prev) => !prev)}
              hideMobileView={() => setShowChild(false)}
              playlist={album.tracks}
              currentIndex={currentIndex}
              handleSelectTrack={handleSelectTrack}
            />
          </Collapse>
        </Box>
      )}
      {(isTablet || isDesktop) && (
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              background: "#121212",
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 1000,
            }}
          >
            <Slider
              size="small"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              onChange={(event, value) =>
                handleSeek(typeof value === "number" ? value : (value as number[])[0])
              }
              sx={{ flexGrow: 1, padding: "0 !important", display: "block" }}
            />

            <Box
              onClick={() => {
                setShowChild(!showChild);
              }}
              sx={{
                padding: "0 0 4px 4px",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    size="large"
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePrev();
                    }}
                  >
                    <SkipPreviousIcon
                      fontSize="inherit"
                      sx={{ color: "white" }}
                    />
                  </IconButton>

                  <IconButton
                    aria-label="play-pause"
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePlayPause();
                    }}
                    sx={{ fontSize: 48 }}
                  >
                    {isPlaying ? (
                      <PauseIcon fontSize="inherit" sx={{ color: "white" }} />
                    ) : (
                      <PlayArrowIcon
                        fontSize="inherit"
                        sx={{ color: "white" }}
                      />
                    )}
                  </IconButton>

                  <IconButton
                    size="large"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleNext();
                    }}
                  >
                    <SkipNextIcon fontSize="inherit" sx={{ color: "white" }} />
                  </IconButton>

                  <Typography
                    variant="caption"
                    sx={{ color: "gray", marginLeft: 1 }}
                  >
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                  <AlbumCover title={currentTrack.name} size={64} />
                  <Stack>
                    <Typography variant="subtitle1" color="white">
                      {currentTrack.name}
                    </Typography>
                    <Typography variant="subtitle2" color="gray">
                      {album.name} - {currentTrack.artist} - {album.year}
                    </Typography>
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    size="large"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsRepeat((prev) => !prev);
                    }}
                  >
                    <RepeatIcon
                      fontSize="inherit"
                      sx={{ color: isRepeat ? "red" : "white" }}
                    />
                  </IconButton>

                  <IconButton
                    size="large"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsShuffle((prev) => !prev);
                    }}
                  >
                    <Shuffle
                      fontSize="inherit"
                      sx={{ color: isShuffle ? "red" : "white" }}
                    />
                  </IconButton>
                </Box>
              </Stack>
            </Box>
          </Box>

          <Collapse
            in={showChild}
            timeout={300}
            unmountOnExit
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "90vh",
              backgroundColor: "black",
            }}
          >
            <DesktopLayout
              track={currentTrack}
              playlist={album.tracks}
              currentIndex={currentIndex}
              handleSelectTrack={handleSelectTrack}
              album={album}
            />
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

export default AudioPlayer;
