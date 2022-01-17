import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ipcRenderer } from 'electron';
import {
  FormControl as MUIFormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from '@mui/material';
import { HsvColor, HsvColorPicker } from 'react-colorful';
import { useDebouncyEffect } from 'use-debouncy';

import modes, { RGBMode } from './led_modes';
import { SET_LED_HSV_CHANNEL, SET_LED_MODE_CHANNEL } from '../consts';

const MainGrid = styled(Grid)`
  width: 100%;
  height: 100%;
`;

const FormControl = styled(MUIFormControl)`
  margin-top: 10px;
  width: 170px;
`;

const toByteHSV = ({ h, s, v }: HsvColor) => ({
  h: Math.round((h / 360) * 255),
  s: Math.round((s / 100) * 255),
  v: Math.round((v / 100) * 255),
});

const RgbConfigurator = () => {
  const [mode, setMode] = useState<RGBMode>(null);
  const [color, setColor] = useState<HsvColor>(null);
  const [speed, setSpeed] = useState(0);

  const handleModeChange = (e: SelectChangeEvent) => {
    const mode = modes.find(
      (it) => it.byte.toString() === e.target.value.toString()
    );
    setSpeed(0);
    setMode(mode);
    ipcRenderer.invoke(SET_LED_MODE_CHANNEL, mode.byte);
  };

  const handleSpeedChange = (_: Event, value: number) => {
    setSpeed(value);
    ipcRenderer.invoke(SET_LED_MODE_CHANNEL, mode.byte + value);
  };

  useDebouncyEffect(
    () => {
      const { h, s, v } = toByteHSV(color);
      ipcRenderer.invoke(SET_LED_HSV_CHANNEL, h, s, v);
    },
    500,
    [color]
  );

  return (
    <MainGrid container spacing={2}>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel id="led-mode-label">Lightnig Mode</InputLabel>
          <Select
            labelId="led-mode-label"
            label="Lightnig Mode"
            value={mode?.byte || ''}
            onChange={handleModeChange}
          >
            {modes.map((it) => (
              <MenuItem key={it.byte} value={it.byte}>
                {it.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {mode && mode.speed > 0 && (
        <Grid item xs={12}>
          <Slider
            aria-label="Animation speed"
            defaultValue={0}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={mode.speed}
            value={speed}
            onChange={handleSpeedChange}
          />
        </Grid>
      )}
      {mode && mode.staic && (
        <Grid item xs={12}>
          <HsvColorPicker color={color || undefined} onChange={setColor} />
        </Grid>
      )}
    </MainGrid>
  );
};

export default RgbConfigurator;
