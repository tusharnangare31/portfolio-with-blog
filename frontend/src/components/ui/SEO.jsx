import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Tushar Nangare | Python Full Stack Developer Portfolio',
  description = 'Information Technology graduate building and shipping full-stack applications end to end — React/React Native, Next.js, Python, Supabase, PostgreSQL, Docker, and AWS.',
  url = 'https://tusharnangare.netlify.app/',
  image,
  type = 'website',
}) {
  const fullTitle = title.includes('Tushar') ? title : `${title} | Tushar Nangare`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
