import Link from "next/link";
import Date from "../../components/date";
import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import { getFlightCardData } from "../../lib/cards";
import {
  CalendarIcon,
  FireIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";

export async function getStaticProps() {
  const cardData = getFlightCardData();
  return {
    props: {
      cardData,
    },
  };
}

export default function Home({ cardData }) {
  return (
    <Layout>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                  <div className="ml-4 mt-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Flight Cards
                    </h3>
                  </div>
                  <div className="ml-4 mt-2 flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create new card
                    </button>
                  </div>
                </div>
              </div>
              <ul className="divide-y divide-gray-200">
                {cardData.map((card) => (
                  <li key={card.id}>
                    <Link href={`/cards/${card.id}`}>
                      <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {card.name}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {card.state}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <FireIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              {card.motor}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <LocationMarkerIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              {card.location}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <CalendarIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              {card.state} on{" "}
                              <time dateTime={card.closeDate}>
                                {card.closeDateFull}
                              </time>
                            </p>
                          </div>
                        </div>
                      </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
      </div>
    </Layout>
  );
}
