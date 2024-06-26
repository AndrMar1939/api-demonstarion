/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  // disable: false,
  runtimeCaching: [],
  fallbacks: {
    document: "/~offline",
  },
});

export default withPWA({

});
