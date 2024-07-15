/** @type {import('next').NextConfig} */
import withVideos from "next-videos";

const nextConfig = {
	output: "export",
	basePath: process.env.NODE_ENV === "production" ? "/nextjsmarketplace" : "",
};

export default {
	...nextConfig,
	...withVideos(),
};
