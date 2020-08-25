const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const embedYouTube = require('eleventy-plugin-youtube-embed');

module.exports = function (eleventyConfig) {
  // Copy './assets/' to '_site/assets/'
  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy({
    './node_modules/@mapsindoors/components/': 'assets/components',
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.setBrowserSyncConfig({
    ui: false,
  });

  return {
    dir: {
      input: `src`,
      output: `dist`,
      includes: `_includes`,
      data: `_data`,
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
