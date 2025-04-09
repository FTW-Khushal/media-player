import React, {  } from 'react';
import { Track } from '../types/Track';

import QueueItem from './listItem/QueueItem';

interface PlaylistQueueProps {
  playlist: Track[];
  currentIndex: number;
  onSelectTrack: (index: number) => void;
}

const PlaylistQueue: React.FC<PlaylistQueueProps> = ({ playlist, currentIndex, onSelectTrack }) => {

  return (

      <ul style={{ listStyleType: 'none', padding: 0, margin: 0,  height: '100%', overflowY: 'auto' }}>
        {playlist.map((track, index) => (
          <li
        key={index}
        onClick={() => onSelectTrack(index)}
        style={{ cursor: 'pointer', padding:'0px 8px'}}
          >
        <QueueItem backgroundColor={index === currentIndex ? '#121212' : 'default'} track={track} />
          </li>
        ))}
      </ul>

  );
};

export default PlaylistQueue;