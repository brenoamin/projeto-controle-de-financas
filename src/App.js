import logo from "./images/Logo.png";
import filtro from "./images/icons8-filtro-48 1.png";
import lixo from "./images/icons8-lixo 1.png";
import editor from "./images/icons8-editar 3.png";
import up from "./images/Polygon 3.png";
import down from "./images/Polygon 4.png";
import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Filtro from "./components/Filtro";
import "./App.css";

function Transactions({
  listas,
  setmostrarModalDelete,
  mostrarModalDelete,
  handleDeleteTransaction,
  handleEditingOpen,
}) {
  return listas.map((lista) => (
    <div className="table-line" key={lista.id}>
      <span className="line-items ">
        {new Date(lista.date).toLocaleString().replace("00:00:00", "")}
      </span>
      <span className="line-items ">
        {lista.week_day[0].toUpperCase() +
          lista.week_day.slice(1).toLowerCase()}
      </span>
      <span className="line-items ">{lista.description}</span>
      <span className="line-items ">{lista.category}</span>
      <span
        className={`line-items ${
          lista.type === "credit" ? "valor-style-in" : "valor-style-out"
        }`}
      >
        {`${lista.type === "credit" ? "" : "-"} R$ ${(lista.value / 100)
          .toFixed(2)
          .replace(".", ",")}`}
      </span>
      <span className="line-items ">
        <img
          src={editor}
          onClick={() => handleEditingOpen(lista)}
          className="edit-icon"
          alt=""
        />
        <picture className="delete-container">
          <img
            onClick={() => setmostrarModalDelete(lista.id)}
            src={lixo}
            className="delete-icon margin-icons"
            alt=""
          />
          {mostrarModalDelete === lista.id && (
            <div className="container-confirm-delete">
              <div className="confirm-delete">Apagar item?</div>
              <div className="btn-delete">
                <button
                  className="btn-actions-confirm-delete btn-yes"
                  onClick={() => handleDeleteTransaction(lista.id)}
                >
                  Sim
                </button>
                <button
                  onClick={() => setmostrarModalDelete(false)}
                  className="btn-actions-confirm-delete btn-no"
                >
                  Não
                </button>
              </div>
            </div>
          )}
        </picture>
      </span>
    </div>
  ));
}

function App() {
  const [listas, setListas] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [mostrarModal, setmostrarModal] = useState(false);
  const [mostrarModalDelete, setmostrarModalDelete] = useState();
  const [mostrarFiltro, setmostrarFiltro] = useState(false);
  const [entradaON, setentradaON] = useState(false);
  const [filtroDiaSemana, setFiltroDiaSemana] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState([]);
  const [valMin, setValMin] = useState("");
  const [valMax, setValMax] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [valueInput, setValueInput] = useState(0);
  const [categoryInput, setCategoryInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [transactionInEditing, setTransactionInEditing] = useState(false);
  const [ordenar, setOrdenar] = useState("data");
  const [asc, setAsc] = useState(false);

  function handleOrdenarData(listas) {
    setOrdenar("data");
    if (asc) {
      const dateOrder = listas.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      listaFiltrada.length ? setListas(dateOrder) : setListaFiltrada(dateOrder);
    } else {
      const dateOrder = listas.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      listaFiltrada.length ? setListas(dateOrder) : setListaFiltrada(dateOrder);
    }
    setAsc((prev) => !prev);
  }
  function handleOrdenarDia(listas) {
    setOrdenar("dia");
    if (asc) {
      const weekOrder = listas.sort((a, b) => {
        return new Date(b.date).getDay() - new Date(a.date).getDay();
      });
      listaFiltrada.length ? setListas(weekOrder) : setListaFiltrada(weekOrder);
    } else {
      const weekOrder = listas.sort((a, b) => {
        return new Date(a.date).getDay() - new Date(b.date).getDay();
      });
      listaFiltrada.length ? setListas(weekOrder) : setListaFiltrada(weekOrder);
    }
    setAsc((prev) => !prev);
  }

  function handleOrdenarValue(listas) {
    let auxArray = [];
    setOrdenar("value");
    if (asc) {
      const newCredit = listas
        .filter((lista) => lista.type === "debit")
        .sort((a, b) => a.value - b.value);
      const newDebit = listas
        .filter((lista) => lista.type === "credit")
        .sort((a, b) => b.value - a.value);
      auxArray = [...newDebit, ...newCredit];
      listaFiltrada.length ? setListaFiltrada(auxArray) : setListas(auxArray);
    } else {
      const newCredit = listas
        .filter((lista) => lista.type === "debit")
        .sort((a, b) => b.value - a.value);
      const newDebit = listas
        .filter((lista) => lista.type === "credit")
        .sort((a, b) => a.value - b.value);
      auxArray = [...newCredit, ...newDebit];
      listaFiltrada.length ? setListaFiltrada(auxArray) : setListas(auxArray);
    }
    setAsc((prev) => !prev);
  }
  function handleEditingClose() {
    setmostrarModal(false);
    setTransactionInEditing(false);
  }
  function handleEditingOpen(lista) {
    setTransactionInEditing(lista);
    setmostrarModal(true);
  }
  const handleWeekDay = (weekDay) => {
    const LowerWeekDay = weekDay;
    const days = filtroDiaSemana.map((day) => day);
    if (days.includes(LowerWeekDay)) {
      const indice = days.indexOf(weekDay);
      const newDays = days.splice(indice, 1);
      setFiltroDiaSemana(days);
    } else {
      const newDays = weekDay;
      setFiltroDiaSemana((prev) => [...prev, newDays]);
    }
  };
  const handleCategory = (lista) => {
    const LowerCategory = lista.category;
    const categories = filtroCategoria.map((category) => category);
    if (categories.includes(LowerCategory)) {
      const indice = categories.indexOf(lista.category);
      const newCategories = categories.splice(indice, 1);
      setFiltroCategoria(categories);
    } else {
      const newCategories = lista.category;
      setFiltroCategoria((prev) => [...prev, newCategories]);
    }
  };
  useEffect(() => {
    loadTransactions();
  }, []);
  
  async function loadTransactions() {
    try {
      const response = await fetch("http://localhost:3333/transactions", {
        method: "GET",
      });
      const data = await response.json();
      setListas(data);
      listaFiltrada.length ? setListas(data) : setListaFiltrada(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleRegisterTransaction() {
    if (!dateInput || !valueInput || !categoryInput || !descriptionInput) {
      return;
    }
    const dayInput = parseInt(dateInput.slice(0, 2));
    const monthInput = parseInt(dateInput.slice(3, 5));
    const yearInput = parseInt(dateInput.slice(6, 10));
    let day = "";
    const newDate = new Date(yearInput, monthInput - 1, dayInput);
    switch (newDate.getDay()) {
      case 0:
        day = "domingo";
        break;
      case 1:
        day = "segunda";
        break;
      case 2:
        day = "terça";
        break;
      case 3:
        day = "quarta";
        break;
      case 4:
        day = "quinta";
        break;
      case 5:
        day = "sexta";
        break;
      case 6:
        day = "sábado";
    }
    const body = {
      date: newDate,
      week_day: day,
      description: descriptionInput,
      value: parseInt(valueInput),
      category: categoryInput,
      type: entradaON ? "credit" : "debit",
    };
    const response = await fetch("http://localhost:3333/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setmostrarModal(false);
    setDateInput("");
    setValueInput("");
    setDescriptionInput("");
    setCategoryInput("");
    await loadTransactions();
  }
  async function handleDeleteTransaction(transactionID) {
    await fetch(`http://localhost:3333/transactions/${transactionID}`, {
      method: "DELETE",
    });
    await loadTransactions();
    setmostrarModalDelete(false);
  }
  useEffect(() => {
    if (transactionInEditing) {
      setDateInput(
        new Date(transactionInEditing.date)
          .toLocaleString()
          .replace("00:00:00", "")
      );
      setValueInput(transactionInEditing.value);
      setDescriptionInput(transactionInEditing.description);
      setCategoryInput(transactionInEditing.category);
      return;
    }
    setDateInput("");
    setValueInput("");
    setDescriptionInput("");
    setCategoryInput("");
  }, [transactionInEditing]);

  async function handleEditTransaction() {
    if (!dateInput || !valueInput || !categoryInput || !descriptionInput) {
      return;
    }
    const dayInput = parseInt(dateInput.slice(0, 2));
    const monthInput = parseInt(dateInput.slice(3, 5));
    const yearInput = parseInt(dateInput.slice(6, 10));
    let day = "";
    const newDate = new Date(yearInput, monthInput - 1, dayInput);
    switch (newDate.getDay()) {
      case 0:
        day = "domingo";
        break;
      case 1:
        day = "segunda";
        break;
      case 2:
        day = "terça";
        break;
      case 3:
        day = "quarta";
        break;
      case 4:
        day = "quinta";
        break;
      case 5:
        day = "sexta";
        break;
      case 6:
        day = "sábado";
    }
    const body = {
      date: newDate,
      week_day: day,
      description: descriptionInput,
      value: parseInt(valueInput),
      category: categoryInput,
      type: entradaON ? "credit" : "debit",
    };
    const response = await fetch(
      `http://localhost:3333/transactions/${transactionInEditing.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    await loadTransactions();
    setmostrarModal(false);
    setDateInput("");
    setValueInput("");
    setDescriptionInput("");
    setCategoryInput("");
    setTransactionInEditing(false);
  }
  useEffect(() => {
    console.log(filtroCategoria);
    console.log(filtroDiaSemana);
  }, [filtroCategoria,filtroDiaSemana]);

  let entrada = 0;
  let saida = 0;

  listas.forEach((lista) => {
    lista.type === "credit" ? (entrada += lista.value) : (saida += lista.value);
  });
  function handleFilterList(valMin, valMax) {
    const filteredTransactions = listas.filter((lista) => {
      if (lista.value >= valMin*100 && lista.value <= valMax*100) {
        return true;
      } else {
        return false;
      }
    }
    );
    setListaFiltrada(filteredTransactions);
    setmostrarFiltro(false);
    setValMax("");
    setValMin("");
  }
  function handleCleanFilter() {
    setFiltroCategoria([]);
    setFiltroDiaSemana([])
    setValMin("");
    setValMax("");
  }
  return (
    <div className="App">
      {mostrarModal && (
        <Modal
          setmostrarModal={setmostrarModal}
          entradaON={entradaON}
          setentradaON={setentradaON}
          dateInput={dateInput}
          setDateInput={setDateInput}
          valueInput={valueInput}
          setValueInput={setValueInput}
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          descriptionInput={descriptionInput}
          setDescriptionInput={setDescriptionInput}
          handleRegisterTransaction={handleRegisterTransaction}
          transactionInEditing={transactionInEditing}
          handleEditingClose={handleEditingClose}
          handleEditTransaction={handleEditTransaction}
        />
      )}

      <div className="container-header">
        <img src={logo} alt="" />
      </div>
      <div className="container">
        <div className="open-filters-button">
          <button onClick={() => setmostrarFiltro((prev) => !prev)}>
            <img src={filtro} alt="Filtrar finanças" />
            <span>Filtrar</span>
          </button>
        </div>
        <div className="container-info">
          <div className="table-description">
            {mostrarFiltro && (
              <Filtro
                handleWeekDay={handleWeekDay}
                filtroDiaSemana={filtroDiaSemana}
                setFiltroDiaSemana={setFiltroDiaSemana}
                setValMin={setValMin}
                valMin={valMin}
                setValMax={setValMax}
                valMax={valMax}
                listas={listas}
                handleFilterList={handleFilterList}
                listaFiltrada={listaFiltrada}
                setListaFiltrada={setListaFiltrada}
                setmostrarFiltro={setmostrarFiltro}
                handleCleanFilter={handleCleanFilter}
                handleCategory={handleCategory}
                filtroCategoria={filtroCategoria}
                filtroDiaSemana={filtroDiaSemana}
              />
            )}
            <div className="table">
              <div className="table-head">
                <span
                  className="column-title text-start"
                  id="date"
                  onClick={() =>
                    handleOrdenarData(
                      listaFiltrada.length ? listaFiltrada : listas
                    )
                  }
                >
                  Data{" "}
                  {ordenar === "data" && <img src={asc ? up : down} alt="" />}
                </span>
                <span
                  className="column-title text-center"
                  id="week-day"
                  onClick={() =>
                    handleOrdenarDia(
                      listaFiltrada.length ? listaFiltrada : listas
                    )
                  }
                >
                  Dia da semana{" "}
                  {ordenar === "dia" && <img src={asc ? up : down} alt="" />}
                </span>
                <span className="column-title text-center">Descrição</span>
                <span className="column-title text-center">Categoria</span>
                <span
                  className="column-title text-center"
                  id="value"
                  onClick={() =>
                    handleOrdenarValue(
                      listaFiltrada.length ? listaFiltrada : listas
                    )
                  }
                >
                  Valor{" "}
                  {ordenar === "value" && <img src={asc ? up : down} alt="" />}
                </span>
                <div className="column-title"></div>
              </div>
              <Transactions
                listas={listaFiltrada.length ? listaFiltrada : listas}
                setmostrarModalDelete={setmostrarModalDelete}
                mostrarModalDelete={mostrarModalDelete}
                handleDeleteTransaction={handleDeleteTransaction}
                setTransactionInEditing={setTransactionInEditing}
                handleEditingOpen={handleEditingOpen}
              />
            </div>
          </div>
          <div className="container-finança">
            <div className="container-resume">
              <h2>Resumo</h2>
              <table className="in-out-table">
                <tbody>
                  <tr className="entrada-in">
                    <td className="entrada">Entradas</td>
                    <td className="in">{`R$ ${entrada / 100},00`}</td>
                  </tr>
                  <tr className="saida-out">
                    <td className="saida">Saídas</td>
                    <td className="out">{`R$ ${saida / 100},00`}</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <table className="saldo-table">
                <tbody>
                  <tr className="saldo-balance">
                    <td className="saldo">Saldo</td>
                    <td className="balance">{`R$ ${
                      (entrada - saida) / 100
                    },00`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button onClick={() => setmostrarModal(true)} className="btn-add">
              Adicionar Registro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
