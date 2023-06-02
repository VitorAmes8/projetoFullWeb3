import style from "./Home.module.css";
import { CardPerson } from "../User/CardPerson";
import { CardContato, Delete, Update } from "../Contato/CardContatos";
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoPencil, IoSearchOutline, IoAdd } from "react-icons/io5";
import { useEffect, useState } from "react";
import { api, server } from "../../api/axios";
import vitor from "../../assets/vitinho.png";

export function Home() {

  let [persons, setPersons] = useState([]);
  let [valor, setValor] = useState('');

  useEffect(() => {
    Load()
  }, []);

  async function Load() {
    const temp = await server.get("user");
    setPersons(temp.data);
  }

  async function Adicionar() {
    event.preventDefault();

    const resultAPI = await api.get("/");
    const user = resultAPI.data.results[0];
    const nomeCompleto = `${user.name.first} ${user.name.last}`;
    const avatar = user.picture.large;
    const cell = user.cell;

    await server.post("user/", {
      name: nomeCompleto,
      avatar: avatar,
      celular: cell,
    });
    Load();
  }

  async function Deletar() {
    event.preventDefault();
    Delete();
    Load();
  }

  function Pesquisar() {
    event.preventDefault();  
    if (valor === '') { Load(); }
    else{
      console.log(`Nome procurado: ${valor}`);
      let results = [];

    persons.map((person => {
      if(person.name.toLowerCase().includes(valor.toLowerCase())) {
        results.push(person);
        return
      }
    }))
    setPersons(results)
    }
  }

  async function Editar() {
    event.preventDefault();

    const resultAPI = await api.get("/");

    const user = resultAPI.data.results[0];

    Update(user);
    Load();
  }

  return (
    <div className={style.container}>

      <CardPerson
        cover="https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2dyYW1taW5nfGVufDB8fDB8fHww&w=1000&q=80"
        avatar = {vitor}
        name="Vitor Ames"
        office='Estudante de T.I' />

      <div className={style.contatos}>
        <div className={style.controles}>
          <form >
            <div className={style.headerContatos}>
              <h1 className={style.title}>Meus contatos</h1>
              <div className={style.buttons}>
                <button className={style.button} onClick={Adicionar}> <IoAdd /> </button>
                <button className={style.button} onClick={Editar}> <IoPencil /> </button>
                <button className={style.button} onClick={Deletar}> <BsFillTrash3Fill /> </button>
              </div>
            </div>

            <div className={style.pesquisa}>
              <button className={style.buttonPesquisa} onClick={Pesquisar}> <IoSearchOutline /> </button>
              <input type='text' name='pesquisa' className={style.inputPesquisa} placeholder="Busque o contato pelo nome" value={valor} onChange={() => { setValor(event.target.value) }} />
            </div>

          </form>
        </div>

        <div className={style.listaCatalogo}>
          {
            persons.map((person, index) => (
              <CardContato key={index}
                avatar={person.avatar}
                name={person.name}
                celular={person.celular}
                id={person.id}
              />
                ))
          }
        </div>
      </div>
    </div>
  );
}