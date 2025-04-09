import React from 'react';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => (
  <div className="flex items-center gap-2">
    <label htmlFor="volume" className="text-sm">Volume</label>
    <input
      id="volume"
      type="range"
      min={0}
      max={1}
      step={0.01}
      value={volume}
      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
      className="w-full"
    />
  </div>
);

export default VolumeControl;