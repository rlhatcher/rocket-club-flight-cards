import Link from "next/link";
import Date from "../components/date";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getFlightCardData } from "../lib/cards";
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
 
      </div>
    </Layout>
  );
}
