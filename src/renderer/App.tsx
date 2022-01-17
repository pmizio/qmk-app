import React from 'react';
import Devices from './Devices';
import { AppBar, Toolbar, Typography } from '@mui/material';
import RgbConfigurator from './RgbConfigurator';

const App = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          QMK App
        </Typography>
        <Devices />
      </Toolbar>
    </AppBar>
    <RgbConfigurator />
  </>
);

export default App;
