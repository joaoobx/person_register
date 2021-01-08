import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

const url = "http://127.0.0.1:3000/persons/";

export default function CreatePerson() {
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

  const handlePressSubmit = () => {
    axios
    .post(url, form)
    .then(() => {
      console.log("sucesso");
      window.history.back();
      })
      // Catch é uma forma muito eficiente de tratar erros
      .catch(console.error);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Página de criar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Página de criar</p>

        <p>{JSON.stringify(form)}</p>
        <p>
          <label>
            Name:{" "}
            <input
              type="text"
              onChange={(event) => handleChangeName(event.currentTarget.value)}
            ></input>
          </label>
        </p>
        <p>
          <label>
            Email:{" "}
            <input
              type="text"
              onChange={(event) => handleChangeEmail(event.currentTarget.value)}
            ></input>
          </label>
        </p>
        <p>
          <label>
            Age:{" "}
            <input
              type="text"
              onChange={(event) => handleChangeAge(event.currentTarget.value)}
            ></input>
          </label>
        </p>
        <p>
          <button onClick={handlePressSubmit}>Submit</button>
        </p>
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
