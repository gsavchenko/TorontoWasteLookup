module.exports = {
  pathPrefix: `/gsavchenko.github.io`,
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/wastewizard.json`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      resolve: `gatsby-transformer-remark`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    }
  ]
};
