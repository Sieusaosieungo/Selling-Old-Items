const UAParser = require("ua-parser-js");

const DEVICE_TYPES = {
  MOBILE: "mobile",
  TABLET: "tablet",
  SMART_TV: "smarttv",
  CONSOLE: "console",
  WEARABLE: "wearable",
  DESKTOP: undefined
};

const getPlatformDetect = userAgent => {
  const parser = new UAParser();

  parser.setUA(userAgent);

  const { os, browser, device } = parser.getResult();

  return {
    platform: {
      device: device.type || "desktop",
      os: os.name,
      model: device.model,
      browser: browser.name,
      version: {
        os: os.version,
        browser: browser.major
      },
      isDesktop: device.type === DEVICE_TYPES.DESKTOP,
      isMobile: device.type === DEVICE_TYPES.MOBILE,
      isTablet: device.type === DEVICE_TYPES.TABLET,
      isSmarttv: device.type === DEVICE_TYPES.SMART_TV,
      isWearable: device.type === DEVICE_TYPES.WEARABLE,
      isIOS: os.name === "iOS"
    }
  };
};

const usePlatformDetect = userAgent => getPlatformDetect(userAgent);

module.exports = usePlatformDetect;
