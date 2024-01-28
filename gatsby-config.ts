import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Bianka & David',
    author: 'David Sass',
    siteUrl: 'https://biankaesdavid.hu',
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
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Bianka & David',
        short_name: 'Bianka & David',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/assets/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-analytics', // default
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        googleTagManager: {
          trackingId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-tagmanager', // default
          dataLayerName: 'dataLayer', // default
        },
        facebookPixel: {
          pixelId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-facebook-pixel', // default
        },
        tikTokPixel: {
          pixelId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-tiktok-pixel', // default
        },
        hotjar: {
          hjid: '0000000',
          hjsv: '6',
          cookieName: 'gatsby-gdpr-hotjar', // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production', 'development'],
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
  ],
};
export default config;
