import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <div key={client.id} className="d-flex align-items-center mb-3">
      <div>
        <strong>{client.name}</strong>
        <br />
        {client.email}
        <br />
        {client.phone}
      </div>
      <button className="btn btn-danger btn-sm ms-auto" onClick={deleteClient}>
        <FaTrash />
      </button>
    </div>
  );
}
