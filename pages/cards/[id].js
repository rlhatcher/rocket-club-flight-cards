import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllCardIds, getCardData } from "../../lib/cards";

export async function getStaticProps({ params }) {
  const cardData = getCardData(params.id);
  return {
    props: {
      cardData,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = getAllCardIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Card({ cardData }) {
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
}
