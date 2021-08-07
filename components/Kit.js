import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

import { PaperClipIcon } from "@heroicons/react/solid";
// import ErrorMessage from './ErrorMessage'
// import PostUpvoter from './PostUpvoter'
// Use for build it component later

export const KIT_QUERY = gql`
  query getKit($kitId: Int!) {
    kit(where: { id: { _eq: $kitId } }) {
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
  }
`;
export const KIT_IDS_QUERY = gql`
  query getIds {
    kit {
      id
    }
  }
`;

export const kitQueryVars = {
  kitId: 0,
};

export default function Kit() {
  const { loading, error, data } = useQuery(KIT_QUERY, {
    variables: kitQueryVars,
  });

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;
  
  const aKit = data[0]
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-20 w-20 rounded-md"
              src={aKit.image}
              alt={aKit.name}
            />
          </div>
          <div>
            <h3 className="text-lg leading-6 font-bold text-gray-900">
              {kit.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{kit.name}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Recommended Engines
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {kit.recommended_engines}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Projected Altitude
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {kit.projected_max_altitude}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Length</dt>
            <dd className="mt-1 text-sm text-gray-900">{kit.length}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Recovery System
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {kit.recovery_system}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{kit.description}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Extras</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 flex-1 w-0 truncate">
                      Instructions
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href={kit.instructions}
                      target="_blank"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
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
  );
}
