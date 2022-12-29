import type { NextPage } from "next";
import Head from "next/head";

type HeadMeta = {
  title_ext: string;
  description: string;
  og_image: string;
  og_url: string;
};

const HeadMeta = (props: HeadMeta) => {

  const temp_desc = 'All of you are welcome in Kohee. Gather all of the content you produce, curate, and share online, no matter where it is dispersed, and reassemble it in one place –your Kohee — where it can be easily found.'

  return (
    <>
      <Head>

        <title>Kohee. {props.title_ext ? `| ${props.title_ext}` : `Create a better profile!`}</title>
        
        <meta name="description" content={`${props.description ? `${props.description}` : `${temp_desc}`}`} />
        
        <meta property="og:title" content={`Kohee. ${props.title_ext ? `| ${props.title_ext}` : `Create a better profile!`}`} />
        <meta property="og:description" content={`${props.description ? `${props.description}` : `${temp_desc}`}`} />
        <meta property="og:image" content={`${props.og_image ? `${props.og_image}` : `https://i.imgur.com/WHshbGu.png`}`} />
        <meta property="og:url" content={`${props.og_url ? `${props.og_url}` : `${process.env.NEXT_PUBLIC_HOSTNAME}`}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Kohee. ${props.title_ext ? `| ${props.title_ext}` : `Create a better profile!`}`} />
        <meta name="twitter:description" content={`${props.description ? `${props.description}` : `${temp_desc}`}`} />
        <meta name="twitter:image" content={`${props.og_image ? `${props.og_image}` : `https://i.imgur.com/WHshbGu.png`}`} />

        <link rel="canonical" href={`${props.og_url ? `${props.og_url}` : `${process.env.NEXT_PUBLIC_HOSTNAME}`}`} />
        
      </Head>
    </>
  );
};

export default HeadMeta;
