import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'front',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "376654667965-lq5rc8l7q8c6cdtl2gdc6baj6d15n3bs.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
