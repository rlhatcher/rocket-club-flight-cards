import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import { initializeApollo, addApolloState } from "../../lib/apolloClient";
import Kit, {
  KIT_IDS_QUERY,
  KIT_QUERY,
  kitQueryVars,
} from "../../components/Kit"

// import { getAllKitIds, getKitData } from "../../lib/kits";
import { PaperClipIcon } from '@heroicons/react/solid'
import { data } from "autoprefixer";

export default function KitDetail() {
  return (
    <Layout>
      <Head>
        <title>RocketClub.Online</title>
      </Head>
      <Kit /> 
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  kitQueryVars["kitId"] = params.id
  await apolloClient.query({
    query: KIT_QUERY,
    variables: kitQueryVars,
  });
  
  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({ query: KIT_IDS_QUERY })
  const paths = data.kit.map(kit =>({
    params: {id: kit.id.toString()},
  }))

  return {
    paths,
    fallback: false,
  }
}
