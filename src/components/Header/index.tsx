import { useHistory } from "react-router-dom";

type HeaderProps = {
  title: string;
  action?: string;
  url?: string | undefined;
};
export const Header = (props: HeaderProps) => {
  const history = useHistory();

  const { url } = props;
  function redirect() {
    if(url) history.push(url);
  }

  return (
    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 className="text-lg font-medium mr-auto">{props.title}</h2>
      {props.action && (
        <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
          <button className="btn btn-primary shadow-md mr-2" onClick={redirect}>
            {props.action}
          </button>
        </div>
      )}
    </div>
  );
};
