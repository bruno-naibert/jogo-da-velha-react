import { useEffect, useState } from "react";

const JogoDaVelha = () => {
  const tabelaVazia = Array(9).fill("");
  const [tabela, setTabela] = useState(tabelaVazia);
  const [jogadorAtual, setJogadorAtual] = useState("O");
  const [ganhador, setGanhador] = useState<any>("");
  const [empate, setEmpate] = useState(false);

  const handleClick = (posicao: number) => {
    if (ganhador) {
      alert("O jogo acabou");
      return null;
    }

    if (tabela[posicao] === "") {
      //mudando no array apenas o elemento que foi clicado
      setTabela(
        tabela.map((item, itemPosicao) =>
          itemPosicao === posicao ? jogadorAtual : item
        )
      );

      setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
    }
  };

  const jogaPC = () => {
    for (var i = 0; i <= 9; i++) {
      if (tabela[i] === "") {
        tabela[i] = "X";
        return null;
      }
    }
  };

  //mudar matrix
  const maneiraGanhar = [
    // vertical
    [tabela[0], tabela[1], tabela[2]],
    [tabela[3], tabela[4], tabela[5]],
    [tabela[6], tabela[7], tabela[8]],

    // horintal
    [tabela[0], tabela[3], tabela[6]],
    [tabela[1], tabela[4], tabela[7]],
    [tabela[2], tabela[5], tabela[8]],

    // diagonal
    [tabela[0], tabela[4], tabela[8]],
    [tabela[2], tabela[4], tabela[6]],
  ];

  const verificaGanhador = () => {
    maneiraGanhar.forEach((celulas) => {
      // [1,1,1] === [1,1,1] = false
      if (celulas.every((celula) => celula === "O")) setGanhador("O");
      if (celulas.every((celula) => celula === "X")) setGanhador("X");
    });
  };

  const verificaEmpate = () => {
    // verifica se todas as posições estão preenchidas
    if (tabela.every((item) => item !== "")) {
      setEmpate(true);
    }
  };

  const resetaJogo = () => {
    setJogadorAtual("O");
    setTabela(tabelaVazia);
    setGanhador(null);
    setEmpate(false);
  };

  useEffect(() => {
    verificaGanhador();
    verificaEmpate();
  }, [tabela]);

  useEffect(() => {
    if (jogadorAtual === "X") {
      jogaPC();
      setJogadorAtual("O");
    }
  }, [jogadorAtual]);

  return (
    <>
      <h1>Jogo da Velha</h1>

      {ganhador && <h2>{ganhador} venceu</h2>}
      {empate && <h2>Empatou</h2>}

      {(ganhador || empate) && (
        <button onClick={resetaJogo} type="button">
          Recomeçar
        </button>
      )}

      <div className="tabela">
        {tabela.map((item, posicao) => (
          <div
            onClick={() => handleClick(posicao)}
            key={posicao}
            className={`celula ${item}`}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
};

export default JogoDaVelha;
