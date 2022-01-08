import React from "react";
import close from "../images/close.png";
import InputMask from 'react-input-mask'
function Modal({
  entradaON,
  setentradaON,
  dateInput,
  setDateInput,
  valueInput,
  setValueInput,
  categoryInput,
  setCategoryInput,
  descriptionInput,
  setDescriptionInput,
  handleRegisterTransaction,
  transactionInEditing,
  handleEditingClose,
  handleEditTransaction
}) {
  return (
    <div className="modal-position">
      <div className="modal-container ">
        <div className="upper-container">
          <div className="modal-title">{transactionInEditing ? "Editar" : "Adicionar"} Registro</div>
          <div className="close-modal-img">
            <img
              onClick={() => handleEditingClose()}
              src={close}
              alt="fechar modal"
            />
          </div>
        </div>
        <div className="credit-debit-button">
          <button
            id="credit-button"
            className={`credit-button ${
              entradaON ? "credit-selected-color" : "button-default-color"
            }`}
            onClick={() => setentradaON(true)}
          >
            Entrada
          </button>
          <button
            id="debit-button"
            className={`debit-button ${
              entradaON ? "button-default-color" : "debit-selected-color"
            }`}
            onClick={() => setentradaON(false)}
          >
            Saída
          </button>
        </div>
        <div className="inputs-modal">
          <div className="input-modal">
            <label htmlFor="valor-txt">Valor</label>
            <input id="valor-txt" name="value" value={valueInput} onChange={(e)=>setValueInput(e.target.value)} type="number" />
          </div>
          <div className="input-modal">
            <label htmlFor="categoria">Categoria</label>
            <input id="categoria" name="category" type="text" value={categoryInput} onChange={(e)=>setCategoryInput(e.target.value)} />
          </div>
          <div className="input-modal">
            <label htmlFor="data">Data</label>
            <InputMask mask="99/99/9999" id="data" name="date" type="text" value={dateInput} onChange={(e)=>setDateInput(e.target.value)} />
          </div>
          <div className="input-modal">
            <label htmlFor="descrição">Descrição</label>
            <input id="descrição" name="description" type="text" value={descriptionInput} onChange={(e)=>setDescriptionInput(e.target.value)} />
          </div>
        </div>
        <div className="btn-insert-container">
          <button className="btn-insert" onClick={transactionInEditing ? ()=>handleEditTransaction(): ()=>handleRegisterTransaction()}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
