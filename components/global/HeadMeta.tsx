/* eslint-disable @next/next/no-page-custom-font */
import type { NextPage } from "next";
import Head from "next/head";

type HeadMeta = {
  title_ext: string;
  description: string;
  og_image: string;
  og_url: string;
};

const HeadMeta = (props: HeadMeta) => {

  const temp_desc = 'Gather all of the content you produce and share, Put it in one place where it can be easily found.'

  return (
    <>
      <Head>
        
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <title>Kohee. {props.title_ext ? `| ${props.title_ext}` : `Create a better profile!`}</title>
        
          <meta name="description" content={props.description ? `${props.description}` : `${temp_desc}`} />
        
          {/* Facebook Meta Tags */}
          <meta property="og:title" content={`Kohee. ${props.title_ext ? `| ${props.title_ext}` : `Create a better profile!`}`} />
          <meta property="og:description" content={props.description ? `${props.description}` : `${temp_desc}`} />
          
          <meta property="og:url" content={props.og_url ? `${props.og_url}` : `${process.env.NEXT_PUBLIC_HOSTNAME}`} />
          <meta property="og:type" content="website"/>

          <meta property="og:image" content={props.og_image ? `${props.og_image}` : `https://i.imgur.com/WHshbGu.png`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta property="fb:app_id" content="695286688778792" />


          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content='kohee.app' />
          <meta property="twitter:url" content={`${props.og_url ? `${props.og_url}` : `${process.env.NEXT_PUBLIC_HOSTNAME}`}`} />
          <meta name="twitter:title" content={`Kohee. ${props.title_ext ? `| ${props.title_ext}` : `Create a better profile!`}`} />
          <meta name="twitter:description" content={props.description ? `${props.description}` : `${temp_desc}`} />
          <meta name="twitter:image" content={props.og_image ? `${props.og_image}` : `https://i.imgur.com/WHshbGu.png`} />
      

          <link rel="icon" type="image/png" href="/bean.png" />
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=optional" rel="stylesheet" />
      </Head>
    </>
  );
};

export default HeadMeta;
