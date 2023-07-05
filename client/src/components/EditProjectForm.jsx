
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case "Не начат":
        return "new";
      case "В процессе":
        return "progress";
      case "Завершен":
        return "completed";
      default:
        throw new Error(`Неизвестный статус: ${project.status}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateProject(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Редактировать</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Название</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Описание</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Статус</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Не начат</option>
            <option value="progress">В процессе</option>
            <option value="completed">Завершен</option>
          </select>
        </div>

        <button type="submit" className="btn btn-secondary">
          Редактировать
        </button>
      </form>
    </div>
  );
}