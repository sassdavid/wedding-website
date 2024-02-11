import React from 'react';
import { useSiteMetadata } from '@/hooks/UseSiteMetadata';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, children }) => {
    const { title: defaultTitle, description: defaultDescription, keywords: defaultKeywords } = useSiteMetadata();

    const seo = {
      title: title || defaultTitle,
      description: description || defaultDescription,
      keywords: keywords || defaultKeywords,
    };

    return (
      <Helmet>
        <html lang="hu" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        {children}
      </Helmet>
    );
  }
;

export default SEO;
