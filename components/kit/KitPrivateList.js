import React, { Fragment, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import KitItem from "./KitItem";
import KitFilters from "./KitFilters";

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


const KitPrivateList = props => {
  const [state, setState] = useState({
    filter: "all",
    clearInProgress: false
  });

const filterResults = filter => {
  setState({
    ...state,
    filter: filter
  });
};

  const [clearCompletedTodos] = useMutation(CLEAR_COMPLETED);

  const clearCompleted = () => {
    clearCompletedTodos({
      optimisticResponse: true,
      update: (cache, { data }) => {
        const existingTodos = cache.readQuery({ query: GET_MY_TODOS });
        const newTodos = existingTodos.todos.filter(t => !t.is_completed);
        cache.writeQuery({ query: GET_MY_TODOS, data: { todos: newTodos } });
      }
    });
  };

  const { kits } = props;

  let filteredKits = kits;
  if (state.filter === "active") {
    filteredKits = kits.filter(kit => kit.is_completed !== true);
  } else if (state.filter === "completed") {
    filteredTodos = todos.filter(todo => todo.is_completed === true);
  }

  const todoList = [];
  filteredTodos.forEach((todo, index) => {
    todoList.push(<TodoItem key={index} index={index} todo={todo} />);
  });

  return (
    <Fragment>
      <div className="todoListWrapper">
        <ul>{todoList}</ul>
      </div>

      <TodoFilters
        todos={filteredTodos}
        currentFilter={state.filter}
        filterResultsFn={filterResults}
        clearCompletedFn={clearCompleted}
        clearInProgress={state.clearInProgress}
      />
    </Fragment>
  );
};

const KitPrivateListQuery = () => {
  const { loading, error, data } = useQuery(GET_KITS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return <KitPrivateList kits={data.kits} />;
};

export default KitPrivateListQuery;
export { GET_KITS };


export function getAllKitData() {
  const fullPath = path.join(cardsDirectory, `all.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

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
  const fullPath = path.join(cardsDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const kitData = JSON.parse(fileContents);

  // Combine the data with the id
  return {
    id,
    ...kitData,
  };
}
