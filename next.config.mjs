/** @type {import('next').NextConfig} */
import withVideos from "next-videos";

const nextConfig = {
	/* config options here */
};

export default {
	...nextConfig,
	...withVideos(),
};

module.exports = {
	basePath: "/TODO-app",
	assetPrefix: "/TODO-app/",
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
};
