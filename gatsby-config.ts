import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Bianka & David',
    author: 'David Sass',
    siteUrl: 'https://biankaesdavid.info',
    siteImage: '/static/assets/bg.jpg',
    description: 'A wedding website where you can find all the details about the big day',
    keywords: 'gatsby, wedding website, wedding invitation',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/`,
        name: `assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 80,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Bianka & David',
        short_name: 'Bianka & David',
        start_url: '/',
        background_color: '#343734ed',
        theme_color: '#343734ed',
        display: 'minimal-ui',
        icon: 'static/assets/wedding-rings-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/*', '/privacy'],
        workboxConfig: {
          importWorkboxFrom: 'cdn',
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /static\/assets\/.*\.svg/,
        },
      },
    },
  ],
};
export default config;
