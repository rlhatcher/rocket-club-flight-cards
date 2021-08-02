import { gql } from "@apollo/client"

export function getKitData() {
  const GET_KITS = gql`
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
  }`;

  const { data } = await  Query(GET_KITS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return <KitPrivateList kits={data.kits} />;

  // Use gray-matter to parse the post metadata section
  return JSON.parse(fileContents);
}

export function getAllKitIds() {
  const fileNames = fs.readdirSync(cardsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ""),
      },
    };
  });
}

export function getKitData(id) {
  const fullPath = path.join(cardsDirectory, `kit_info.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const kitData = JSON.parse(fileContents);

  // Combine the data with the id
  return {
    id,
    ...kitData,
  };
}

export default KitPrivateListQuery;
export { GET_KITS };