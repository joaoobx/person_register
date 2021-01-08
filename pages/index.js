import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import axios from "axios";  // biblioteca / módulo

const url = "http://127.0.0.1:3000/persons/";  // servidor API no nosso caso JSON-Server

export default function Home() {
  const [persons, setPersons] = useState([]);  // criar um estrado e uma func que altera o estado
  const [editMode, setEditMode] = useState();
  const [form, setForm] = useState({ name: "", age: "", email: "" });

  const handleChangeName = (text) => {
    setForm((old) => ({ ...old, name: text }));
  };
  const handleChangeEmail = (text) => {
    setForm((old) => ({ ...old, email: text }));
  };
  const handleChangeAge = (text) => {
    setForm((old) => ({ ...old, age: text }));
  };

  const handlePressSubmitEdit = () => {
    axios
      .put(`${url}${form.id}`, form)
      .then(() => {
        console.log("sucesso");
        setEditMode(null);
        setForm({
          name: "",
          email: "",
          age: "",
          id: null,
        });
        fecthPersons();
      })
      // Catch é uma forma muito eficiente de tratar erros
      .catch(console.error);
  };

  const handleClickCreateButton = () => {
    setForm({ name: "", age: "", email: "" });
    setEditMode(true);
  };

  const fecthPersons = () => {
    axios
      .get(url)
      .then(({ data }) => {
        console.log("sucesso", data);
        setPersons(data);
      })
      // Catch é uma forma muito eficiente de tratar erros
      .catch(console.error);
  };

  useEffect(() => {  // como nao tem dependencias, só é executado o codigo abaixo quando inicia
    fecthPersons();
  }, []);  // as dependencias ficam dentro do []

  const deletePost = (id) => {
    setEditMode(null);
    axios
      .delete(`${url}${id}`)
      .then(() => {
        fecthPersons();
      })
      .catch((erro) => console.log(JSON.stringify(erro)));
  };

  const handleEditItem = (id) => {
    const actualPersons = persons.find(
      (person) => String(person.id) === String(id)
    );

    if (actualPersons) {
      setEditMode(id);
      setForm(actualPersons);
    }
  };

  const handlePressSubmit = () => {
    axios
      .post(url, form)
      .then(() => {
        console.log("sucesso");
        fecthPersons();
        setEditMode(null);
      })
      // Catch é uma forma muito eficiente de tratar erros
      .catch(console.error);
  };

  // O editar vai navegar para a página "editar" com o id da pessoa!!!

  const listPerson = persons.map((person, index) => {  // persons é a lista e pessoas
    return (
      <p key={String(person.id)}>
        Name:{person.name} - E-mail:{person.email} - Age:{person.age} - ID:{" "}
        {person.id}----
        <button onClick={() => deletePost(person.id)}>Delete</button>
        <button onClick={() => handleEditItem(person.id)}>Edit</button>
      </p>
    );
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Novo app next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {editMode ? (
          <div>
            {editMode === true ? null : (
              <div>
                <p>ID: {editMode}</p>
              </div>
            )}
            <div>
              <label>
                Name:{" "}
                <input
                  type="text"
                  onChange={(event) => {
                    event.preventDefault();
                    handleChangeName(event.currentTarget.value);
                  }}
                  value={form.name}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Email:{" "}
                <input
                  type="text"
                  onChange={(event) =>
                    handleChangeEmail(event.currentTarget.value)
                  }
                  value={form.email}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Age:{" "}
                <input
                  type="text"
                  onChange={(event) =>
                    handleChangeAge(event.currentTarget.value)
                  }
                  value={form.age}
                ></input>
              </label>
            </div>
            <button
              onClick={
                editMode !== true ? handlePressSubmitEdit : handlePressSubmit
              }
            >
              {editMode === true ? "Criar" : "Editar"}
            </button>
          </div>
        ) : null}
        <p>
          <button onClick={handleClickCreateButton}>Create</button>{" "}
        </p>

        <div>
          <p>Lista de Usuários</p>

          <ul>{listPerson}</ul>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}


//   ajudei a escrever da maneira mais correta possível.. evitar error iniciante..

// criei problemas nos quais vc precisaram APRENDER a CRIAR estratégias para resolver

// Vercel (urls quebrados)
// Github
// ReactJS
// HTML
// Axios -> Consome uma API
// JSON-Server (simula uma API)
