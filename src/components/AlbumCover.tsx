// components/AlbumCover.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface AlbumCoverProps {
  title: string;
  size?: number;
}

const getDarkModeFriendlyColor = (title: string): string => {
  const hash = title
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 40%)`;
};

const AlbumCover: React.FC<AlbumCoverProps> = ({ title, size = 64 }) => {
  const fallbackLetter = title.charAt(0).toUpperCase();
  const backgroundColor = getDarkModeFriendlyColor(title);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: size,
        height: size,
        backgroundColor,
        fontSize: size / 2,
      }}
    >
      <Typography variant="h6" component="span" sx={{ color: "white", fontSize: size / 2 }}>
        {fallbackLetter}
      </Typography>
    </Box>
  );
};

export default AlbumCover;
