import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";

export default function Home() {
  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Задачи</h5>
            <AddProjectModal />
          </div>
          <hr />
          <div>
            <Projects />
          </div>
        </div>
        <div className="col-lg-4 mt-3 mt-lg-0">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Команда</h5>
            <AddClientModal />
          </div>
          <hr />
          <div>
            <Clients />
          </div>
        </div>
      </div>
    </>
  );
}
