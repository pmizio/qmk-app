import os from 'os';
import { ipcMain } from 'electron';
import { devices, HID } from 'node-hid';
import {
  GET_DEVICES_CHANNEL,
  CONNECT_DEVICE_CHANNEL,
  PING_DEVICE_CHANNEL,
  SET_LED_MODE_CHANNEL,
  SET_LED_HSV_CHANNEL,
} from '../consts';

const USAGE = 0x61;
const USAGE_PAGE = 0xff60;

const PING = 0x00;
const SET_LED_MODE = 0x01;
const SET_LED_HSV = 0x02;

const LINUX = 0x00;
const WINDOWS = 0x01;
const OSX = 0x02;

let device: HID;

const getDeviceByVidAndPid = (vid: number, pid: number) =>
  devices().find(
    (it) =>
      it.vendorId === vid &&
      it.productId === pid &&
      it.usagePage === USAGE_PAGE &&
      it.usage === USAGE
  ).path;

const write = (data: number[]) => {
  // rawhid protocol for windows we must send 0 as first byte then 1 after this we send our data
  if (os.platform() == 'win32') {
    data.unshift(0x00);
  }

  device.write([0x01, ...data]);
};

const getOS = () => {
  switch (os.platform()) {
    case 'linux':
      return LINUX;
    case 'win32':
      return WINDOWS;
    case 'darwin':
      return OSX;
    default:
      return LINUX;
  }
};

const attachHidChannel = () => {
  ipcMain.handle(GET_DEVICES_CHANNEL, () =>
    devices().filter((it) => it.usagePage === USAGE_PAGE && it.usage === USAGE)
  );
  ipcMain.handle(CONNECT_DEVICE_CHANNEL, (_, vid: number, pid: number) => {
    if (device) {
      device.close();
    }

    device = new HID(getDeviceByVidAndPid(vid, pid));
  });
  ipcMain.handle(PING_DEVICE_CHANNEL, () => {
    write([PING, getOS()]);
  });
  ipcMain.handle(SET_LED_MODE_CHANNEL, (_, mode: number) => {
    write([SET_LED_MODE, mode]);
  });
  ipcMain.handle(SET_LED_HSV_CHANNEL, (_, ...hsv: number[]) => {
    write([SET_LED_HSV, ...hsv]);
  });
};

export default attachHidChannel;
