import React from "react";
import plus from "../images/plus.svg";
function Filtro({
  handleWeekDay,
  setValMin,
  valMin,
  setValMax,
  valMax,
  listas,
  handleFilterList,
  handleCleanFilter,
  handleCategory,
  filtroCategoria,
  filtroDiaSemana
}) {
  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  return (
    <div className="container-filters">
      <div className="container-filters-types">
        <div className="container-filters-title">
          <div className="filter-title">Dia da semana</div>
        </div>
        <div className="container-internal-filter">
          {weekDays.map((item, index) => (
            <div
              key={index}
              className={`container-chip ${filtroDiaSemana.includes(item) ? "active": "" }`}
              onClick={() => handleWeekDay(item)}
            >
              <div className="style-text">{item}</div> <img src={plus} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className="container-filters-types">
        <div className="container-filters-title">
          <div className="filter-title">Categoria</div>
        </div>
        <div className="container-internal-filter">
          {listas.map((item, index) => (
            <div
              key={index}
              className={`container-chip ${filtroCategoria.includes(item.category) ? "active": "" }`}
              onClick={() => handleCategory(item)}
            >
              <div className="style-text">{item.category}</div> <img src={plus} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className="container-filters-types">
        <div className="container-filters-title">
          <div className="filter-title">Valor</div>
        </div>
        <div className="container-internal-filter">
          <div className="min-value">
            <label className="min-label" htmlFor="min-value">
              Min
            </label>
            <input
              className="min-label"
              type="number"
              id="min-value"
              value={valMin}
              onChange={(e) => setValMin(e.target.value)}
            />
          </div>
          <div className="max-value">
            <label className="max-label" htmlFor="max-value">
              Max
            </label>
            <input
              className="max-label"
              type="number"
              id="max-value"
              value={valMax}
              onChange={(e) => setValMax(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="container-filters-types flex-end-button ">
        <div className="container-internal-filter">
          <div className="button-filter">
            <button className="btn-clear-filters"onClick={()=> handleCleanFilter()} >Limpar Filtros</button>
            <button
              className="btn-apply-filters"
              onClick={() =>
                handleFilterList(
                  valMin,
                  valMax
                )
              }
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filtro;
