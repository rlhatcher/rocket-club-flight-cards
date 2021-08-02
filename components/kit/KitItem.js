import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GET_KITS } from "./KitPrivateList";

const KitItem = ({ index, kit }) => {
  const REMOVE_KIT = gql`
    mutation removeKit($id: Int!) {
      delete_kits(where: { id: { _eq: $id } }) {
        affected_rows
      }
    }
  `;

  const [removeKitMutation] = useMutation(REMOVE_KIT);

  const removeKit = e => {
    e.preventDefault();
    e.stopPropagation();
    removeKitMutation({
      variables: { id: kit.id },
      optimisticResponse: true,
      update: cache => {
        const existingKits = cache.readQuery({ query: GET_KITS });
        const newKits = existingKits.kits.filter(t => t.id !== kit.id);
        cache.writeQuery({
          query: GET_KITS,
          data: { kits: newKits }
        });
      }
    });
  };

  const TOGGLE_KIT = gql`
    mutation toggleKit($id: Int!, $isDiscontinued: Boolean!) {
      update_kits(
        where: { id: { _eq: $id } }
        _set: { is_discontinued: $isDiscontinued }
      ) {
        affected_rows
      }
    }
  `;

  const [toggleKitMutation] = useMutation(TOGGLE_KIT);

  const toggleKit = () => {
    toggleKitMutation({
      variables: { id: kit.id, isDiscontinued: kit.is_discontinued },
      optimisticResponse: true,
      update: cache => {
        const existingKits = cache.readQuery({ query: GET_KITS });
        const newKits = existingKits.kits.map(t => {
          if (t.id === kit.id) {
            return { ...t, is_discontinued: !t.is_discontinued };
          } else {
            return t;
          }
        });
        cache.writeQuery({
          query: GET_KITS,
          data: { kits: newKits }
        });
      }
    });
  };

  return (
    <li>
      <div className="view">
        <div className="round">
          <input
            checked={todo.is_completed}
            type="checkbox"
            id={todo.id}
            onChange={toggleTodo}
          />
          <label htmlFor={todo.id} />
        </div>
      </div>

      <div className={"labelContent" + (todo.is_completed ? " completed" : "")}>
        <div>{todo.title}</div>
      </div>

      <button className="closeBtn" onClick={removeTodo}>
        x
      </button>
    </li>
  );
};

export default KitItem;
