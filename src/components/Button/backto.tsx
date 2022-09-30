import { useHistory } from "react-router-dom";

interface BackToHistory {
    route?: string;
}

const ButtonGoBack = ({ route }: BackToHistory) => {
    const history = useHistory();

  return (
      <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
          <button className="btn btn-primary shadow-md mr-2" onClick={() => !route ? history.goBack() : history.replace(route)}>
              Voltar
          </button>
      </div>
  )
}

export default ButtonGoBack
