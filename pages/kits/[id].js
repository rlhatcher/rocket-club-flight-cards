import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllKitIds, getKitData } from "../../lib/kits";
import { PaperClipIcon } from '@heroicons/react/solid'

export async function getStaticProps({ params }) {
  const kitData = getKitData(params.id);
  return {
    props: {
      kitData,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = getAllKitIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Kit({ kitData }) {
  return (
    <Layout>
      <Head>
        <title>RocketClub.Online - {kitData.name} ({kitData.mfg.name})</title>
      </Head>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
      <div className="flex items-center">
        <div>
        <img
          className="inline-block h-20 w-20 rounded-md"
          src={kitData.image}
          alt={kitData.name}
        />
        </div>
        <div>
        <h3 className="text-lg leading-6 font-bold text-gray-900">{kitData.name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{kitData.mfg.name}</p>
        </div>
      </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Recommended Engines</dt>
            <dd className="mt-1 text-sm text-gray-900">{kitData.recommended_engines}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Projected Altitude</dt>
            <dd className="mt-1 text-sm text-gray-900">{kitData.projected_max_altitude}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Length</dt>
            <dd className="mt-1 text-sm text-gray-900">{kitData.length}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Recovery System</dt>
            <dd className="mt-1 text-sm text-gray-900">{kitData.recovery_system}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {kitData.description}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Extras</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">Instructions</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href={kitData.instructions} target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    </Layout>
  );
}
