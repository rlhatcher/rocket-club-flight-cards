import Layout, { siteTitle } from "../../components/layout";
import { initializeApollo, addApolloState } from "../../lib/apolloClient";
import KitList, {
  ALL_KITS_QUERY,
} from "../../components/KitList"


export default function Kits({ kitData }) {
  return (
    <Layout>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
              <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Kits
                  </h3>
                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Build a Kit
                  </button>
                </div>
              </div>
            </div>
            <KitList />
          </div>
        </div>
      </div>
    </Layout>
  );
}

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
