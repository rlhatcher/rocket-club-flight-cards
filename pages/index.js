import Layout, { siteTitle } from "../components/layout";
import { initializeApollo, addApolloState } from "../lib/apolloClient";
import KitList, {
  ALL_KITS_QUERY,
} from "../components/KitList";

const Home = () => {
  return (
    <Layout>
      <div className="bg-white overflow-hidden shadow rounded-lg">
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_KITS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default Home;
