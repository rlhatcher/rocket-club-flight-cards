import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

import {
  BadgeCheckIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/solid";
// import ErrorMessage from './ErrorMessage'
// import PostUpvoter from './PostUpvoter'
// Use for build it component later

export const ALL_KITS_QUERY = gql`
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

export default function KitList() {
  const { loading, error, data } = useQuery(ALL_KITS_QUERY);

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  const allKits = data.kit;
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {allKits.map((kit, index) => (
          <li key={kit.id}>
            <Link href={`/kits/${kit.id}`}>
              <a className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={kit.image ? `${kit.image}` : '/images/logo-icon.png'}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {kit.name}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <OfficeBuildingIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="truncate">{kit.mfg.name}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            long and {kit.diameter} in diameter
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <BadgeCheckIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                            Recommended Motors {kit.recommended_engines}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
