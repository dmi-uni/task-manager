import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      return alert("Заполните все поля!");
    }

    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }

    console.log(name, email, phone);
    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(email));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Добавить участника</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Добавить участника
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Имя</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Почта</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {!isEmailValid && (
                    <p className="text-danger mt-2">
                      Некорректный адрес электронной почты.
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Телефон</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  data-bs-dismiss={
                    name === "" || email === "" || phone === "" ? "" : "modal"
                  }
                  className="btn btn-secondary"
                  disabled={
                    name === "" || email === "" || phone === "" || !isEmailValid
                  }
                >
                  Добавить
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
