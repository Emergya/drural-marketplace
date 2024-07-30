module.exports = api => {
  const isExtract = api.env("extract");
  const isTest = api.env("test");
  const isStorybook = api.env("storybook");

  const ignore =
    isTest || isStorybook
      ? []
      : ["**/*.test.ts", "**/*.test.tsx", "src/storybook"];
  const presets = ["next/babel"];
  const plugins = [
    [
      "styled-components",
      {
        ssr: true,
        displayName: true,
      },
    ],
    [
      "formatjs",
      {
        idInterpolationPattern: "[sha512:contenthash:base64:6]",
        ast: true,
      },
    ],
  ].filter(Boolean);

  return {
    ignore,
    plugins,
    presets,
  };
};
