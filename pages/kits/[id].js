import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllKitIds, getKitData } from "../../lib/cards";

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
        <title>{cardData.name}</title>
      </Head>
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:px-6">
          {cardData.name}
          {/* We use less vertical padding on card headers on desktop than on body sections */}
        </div>
        <div className="px-4 py-5 sm:p-6">
          {" "}
          {cardData.name}
          <br />
          {cardData.motor}
          <br />
          {cardData.state}
          <br />
          {cardData.closeDate}
        </div>
      </div>
    </Layout>
  );

/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'

export default function Example() {
  return (
        <Layout>
        <Head>
          <title>{cardData.name}</title>
        </Head>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900">Margot Foster</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Application for</dt>
            <dd className="mt-1 text-sm text-gray-900">Backend Developer</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900">margotfoster@example.com</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
            <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd className="mt-1 text-sm text-gray-900">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">resume_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">coverletter_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
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
  )
}


}
