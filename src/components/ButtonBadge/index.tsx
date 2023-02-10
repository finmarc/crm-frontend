export type ButtonBadgeProps = {
  situation: string;
};

export default function ButtonBadge(props: ButtonBadgeProps) {
  const BadgeColor: Record<string, string> = {
    Aprovado: "btn-elevated-success",
    Reprovado: "btn-elevated-danger",
  };
  console.log(props.situation);

  function Modification() {}
  const ClasseNameColor = `btn ${
    BadgeColor[props.situation]
  }  w-24 mt-2 mr-1 mb-2`;

  return (
    <div>
      <button className={ClasseNameColor}>{props.situation}</button>

      {/* 
      <button className="btn btn-elevated-warning w-24 mr-1 mb-2">
        Pendente de documentação
      </button>
      <button className="btn btn-elevated-warning w-24 mr-1 mb-2">
        Em análise
      </button>
      <button className="btn btn-elevated-warning w-24 mr-1 mb-2">
        Pré análise
      </button>
      <button className="btn btn-elevated-dark w-24 mr-1 mb-2">
        Aguardando aprovação
      </button>
      <button className="btn btn-elevated-dark w-24 mr-1 mb-2">
        Aguardando atendimento
      </button> */}
    </div>
  );
}
