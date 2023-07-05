import { gql, useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return null;
  if (error) return <p>Что-то пошло не так</p>;

  return (
    <>
      {!loading && !error && (
        <div className="bg-light rounded p-3 mt-3">
          {data.clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </div>
      )}
    </>
  );
}
