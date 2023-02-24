export type ButtonBadgeProps = {
  situation: string;
};

export default function ButtonBadge(props: ButtonBadgeProps) {
  let ClasseNameColor: string = "";

  if (props.situation === "Pendente documentação") {
    ClasseNameColor =
      "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300";
  }
  if (props.situation === "Pendência encontrada") {
    ClasseNameColor =
      "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300";
  }
  if (props.situation === "Aprovado") {
    ClasseNameColor =
      "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
  }
  if (props.situation === "Concluído") {
    ClasseNameColor =
      "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
  }

  if (props.situation === "Reprovado") {
    ClasseNameColor =
      "bg-red-300 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300";
  }
  if (props.situation.includes("Análise")) {
    ClasseNameColor =
      " bg-indigo-300 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300";
  }
  if (props.situation === "Enviado para o banco") {
    ClasseNameColor =
      "bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300";
  }

  if (props.situation === "Pré-análise") {
    ClasseNameColor =
      "bg-gray-300 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300";
  }

  return (
    <div>
      <span className={ClasseNameColor}>{props.situation}</span>
    </div>
  );
}
