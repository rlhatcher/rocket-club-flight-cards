import Link from "next/link";
import Date from "../components/date";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
    query getAllKits {
      kit(order_by: {name: asc}) {
        id
        name
        model
        mfg {
          id
          name
        }
        image
        recommended_engines
        projected_max_altitude
        recovery_system
        length
        diameter
        estimated_weight
        estimated_assembly_time
        fin_materials
        decal_type
        launch_system
        launch_rod_size
        age_recommendation
        description
        instructions
        is_discontinued
      }
    }`,
  });

  return {
    props: {
      kits: data.kit.slice(0, 4),
    },
 };
}

export default function Home({ kits }) {
  return (
    <Layout>
      <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className={styles.grid}>
      {kits.map((kit) => (
      <div>
      <h3>{kit.name}</h3>
      <p>
        {kit.model} - {kit.mfg.name}
      </p>
    </div>
  ))}
</div>
      </div>
    </Layout>
  );
}