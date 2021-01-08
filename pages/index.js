import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import axios from "axios";

const url = "http://127.0.0.1:3000/persons/";

export default function Home() {
  const [persons, setPersons] = useState([]);
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

  useEffect(() => {
    fecthPersons();
  }, []);

  const deletePost = (id) => {
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

  // O editar vai navegar para a página "editar" com o id da pessoa!!!

  const listPerson = persons.map((person, index) => {
    return (
      <p key={String(person.id)}>
        Name:{person.name} - E-mail:{person.email} - Age:{person.age} - ID:{" "}
        {person.id}----
        <button onClick={() => deletePost(person.id)}>Delete</button>
        <button onClick={() => handleEditItem(person.id)}>Edit</button>
      </p>
    );
  });

  const FormEdit = () => (
    <div>
      <p>
        <label>
          Name:{" "}
          <input
            type="text"
            onChange={(event) => {
              event.preventDefault();
              handleChangeName(event.currentTarget.value)}}
            value={form.name}
          ></input>
        </label>
      </p>
      <p>
        <label>
          Email:{" "}
          <input
            type="text"
            onChange={(event) => handleChangeEmail(event.currentTarget.value)}
            value={form.email}
          ></input>
        </label>
      </p>
      <p>
        <label>
          Age:{" "}
          <input
            type="text"
            onChange={(event) => handleChangeAge(event.currentTarget.value)}
            value={form.age}
          ></input>
        </label>
      </p>
      <p>
        <button
          onClick={() => {
            handlePressSubmitEdit();
          }}
        >
          Submit
        </button>
      </p>
    </div>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Novo app next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {editMode ? <FormEdit /> : null}
        <p>
          <a href="/create">
            {" "}
            <button>Create</button>{" "}
          </a>
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
