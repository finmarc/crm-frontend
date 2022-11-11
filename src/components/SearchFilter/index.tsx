import React, { useState } from "react";
import TomSelect from "tom-select";
import { Litepicker } from "@/base-components";

export default function SearchFilter() {
  const [date, setDate] = useState("");
  return (
    <div className="mt-5 ">
      <div className="intro-y col-span-12 lg:col-span-6">
        <div className="intro-y box">
          <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
            <h2 className="font-medium text-base mr-auto">
              Filtro de Pesquisa
            </h2>
          </div>
          <div className="p-5  ">
            <div className="grid grid-cols-4 gap-2 md:col-span-6">
              <div className=" col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Data Inicial
                </label>
                {/* <input placeholder="Data inicial" /> */}
                <Litepicker
                  value={date}
                  onChange={setDate}
                  options={{
                    autoApply: false,
                    showWeekNumbers: true,

                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  dateFormat="dd/mm/yyyy"
                  className="form-control w-full flex flex-col sm:flex-row"
                />
              </div>
              <div className="input-form col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Data Final
                </label>
                <Litepicker
                  value={date}
                  onChange={setDate}
                  options={{
                    autoApply: false,
                    showWeekNumbers: true,

                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  dateFormat="dd/mm/yyyy"
                  className="form-control w-full flex flex-col sm:flex-row"
                />
              </div>
              <div className="input-form col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Cliente
                </label>
                <select id="cliente" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                </select>
              </div>
              <div className="input-form col-span-1">
                <label
                  htmlFor="validation-form-2"
                  className="form-label w-full flex flex-col sm:flex-row"
                >
                  Situação
                </label>
                <select id="situacao" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                  <option value="Aprovado">Aprovado</option>
                  <option value="Análise">Em análise</option>
                  <option value="Recusado">Recusado</option>
                </select>
              </div>
              <div className="input-form col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Funcionário
                </label>
                <select id="funcionario" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                </select>
              </div>
              <div className="input-form col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Documentos
                </label>
                <select id="documentos" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="analise">Em análise</option>
                  <option value="recusado">Recusado</option>
                </select>
              </div>
              <div className="input-form col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Enviado
                </label>
                <select id="documentos" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
              </div>
              <div className="input-form col-span-1">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Parceiro
                </label>
                <select id="parceiro" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                </select>
              </div>
              <div className="input-form w-full col-span-4 ">
                <label className="form-label w-full flex flex-col sm:flex-row">
                  Aprovado/Rejeitado
                </label>
                <select id="aprovado" className="form-select  sm:mr-2">
                  <option>Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="btn btn-primary mt-5">Pesquisar</button>
              <button className="btn btn-primary mt-5">Limpar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
