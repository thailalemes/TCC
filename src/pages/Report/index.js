import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logonovo.png';
import { Print } from './Print';
import Schedule from '../Schedule';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function NewReport(){
    
    /* this.handleChange = this.handleChange.bind(this); */
    /* this.handleSubmit = this.handleSubmit.bind(this); */

    /* const handleChange = (event) => {
        this.setState({value: event.target.value})
    }
 */
    const emitReport = () => {
        const classeImpressao = new Print(Schedule);
        const documento = classeImpressao.gerarDocumento();
        pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
      }

        return (
        <div className="new-schedule-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Collect It" />
                <h1>Emitir Relatório</h1>
                <p>Informe qual a data desejada e emita o relatório de agendamentos.</p>

                <Link className="back-link" to="/profile-adm">
                    <FiArrowLeft size={16} color="#228B22"/>
                    Voltar para home
                    </Link>

                </section>
                <form>
                    <p>ATENÇÃO: Para que não haja atrasos junto a coleta, favor emitir o relatório com antescedência.</p>
                        <select id="cbores">
                        <option value=""></option>
                                 <option value="ent">Entulho</option>
                        </select>
                        <input id='date' type='date' /* onChange={handleChange} */ placeholder="Escolha uma data" />

                            <button className="button" onClick={emitReport} type="submit">Emitir</button>
                </form>

            </div>
        </div>
        );
    }