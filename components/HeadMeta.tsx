import type { NextPage } from "next";
import Head from "next/head";

type HeadMeta = {
  title_ext: string;
  description: string;
};

const HeadMeta = (props: HeadMeta) => {

  return (
    <>
      <Head>
        <title>Kohee. {props.title_ext ? `| ${props.title_ext}` : `Create a better profile!`}</title>
      </Head>
    </>
  );
};

export default HeadMeta;
