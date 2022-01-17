import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { ipcRenderer } from 'electron';
import type { Device } from 'node-hid';
import {
  FormControl as MUIFormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import {
  GET_DEVICES_CHANNEL,
  CONNECT_DEVICE_CHANNEL,
  PING_DEVICE_CHANNEL,
} from '../consts';

const FormControl = styled(MUIFormControl)`
  min-width: 10rem;
  margin: 10px 0;
`;

const Devices = () => {
  const ref = useRef<number | null>();
  const [device, setDevice] = useState<Device>(null);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    ref.current = window.setInterval(async () => {
      // TODO: move autoconnect to main process
      const devices: Device[] = await ipcRenderer.invoke(GET_DEVICES_CHANNEL);

      if (
        device &&
        !devices.some(
          (it) =>
            it.productId === device.productId && it.vendorId === device.vendorId
        )
      ) {
        // TODO: disconnect
        setDevice(null);
      }

      if (!device && devices) {
        const device = devices[0];

        setDevices(devices);

        if (device) {
          setDevice(devices[0]);
          ipcRenderer.invoke(
            CONNECT_DEVICE_CHANNEL,
            devices[0].vendorId,
            devices[0].productId
          );
          ipcRenderer.invoke(PING_DEVICE_CHANNEL);
        }
      }
    }, 1000);

    return () => {
      window.clearInterval(ref.current);
    };
  }, [device, setDevice, setDevices, ref]);

  const handleConnect = (e: SelectChangeEvent) => {
    const { vendorId, productId } = devices.find(
      (it) => e.target.value === String(it.productId + it.vendorId)
    );
    ipcRenderer.invoke(CONNECT_DEVICE_CHANNEL, vendorId, productId);
  };

  return (
    <FormControl>
      <InputLabel id="device-select-label">Device</InputLabel>
      <Select
        labelId="device-select-label"
        label="Select device"
        value={device ? String(device.productId + device.vendorId) : ''}
        onChange={handleConnect}
      >
        {devices.map((it) => (
          <MenuItem
            key={String(it.productId + it.vendorId)}
            value={String(it.productId + it.vendorId)}
          >
            {it.product}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Devices;
