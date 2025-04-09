import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Track } from "../../types/Track";
import AlbumCover from "../AlbumCover";

interface QueueItemProps {
  track: Track;
  backgroundColor?: string;
}

const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

const QueueItem: React.FC<QueueItemProps> = ({ track, backgroundColor }) => {
  return (
    <Stack
      p={1}
      bgcolor={backgroundColor || "transparent"}
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <AlbumCover title={track.name} size={48} />
          <Stack>
            <Typography variant="subtitle1" color="white">
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
        </Stack>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" color="white">
          {track.duration ? formatTime(track.duration) : "0:00"}
        </Typography>
      </Box>
    </Stack>
  );
};

export default QueueItem;
