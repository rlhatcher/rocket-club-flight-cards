import Link from "next/link";
import Date from "../components/date";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { initializeApollo, addApolloState } from '../lib/apolloClient'

const Home = () => {
  return (
    <Layout>
      <div className="bg-white overflow-hidden shadow rounded-lg">
 
      </div>
    </Layout>
  );
}

export default withApollo({ ssr: true })(Home)