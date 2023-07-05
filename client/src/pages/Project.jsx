import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";

import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Что-то пошло не так</p>;

  return (
    <>
      {!loading && !error && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card p-4">
              <Link
                to="/"
                className="btn btn-light btn-sm w-25 d-inline ms-auto"
              >
                Назад
              </Link>

              <h1>{data.project.name}</h1>
              <p>{data.project.description}</p>

              <h5 className="mt-3">Статус</h5>
              <p className="lead">{data.project.status}</p>

              <ClientInfo client={data.project.client} />

              <EditProjectForm project={data.project} />

              <DeleteProjectButton projectId={data.project.id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
