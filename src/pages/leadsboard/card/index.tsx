type Props = {
  children?: React.ReactNode;
  data: {
    id: number;
    uuid: string;
    title: string;
    subtitle: string;
    updatedAt: string;
  };
};

export const Card = ({children, data}: Props) => {
  return (
    <li className={"mt-3"}>
      <a href="#" className={"block p-5 bg-white rounded shadow"}>
        <div className={"flex justify-between"}>
          <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
            {data.title}
          </p>
          <span>
            <img
              className={"h-6 w-6 rounded-full"}
              src="https://i.pravatar.cc/100" alt="avatar"
            />
          </span> 
        </div>
        <div className={"flex justify-between items-baseline"}>
          <div className={"text-sm text-gray-600"}>
            <time dateTime="2019-09-14">Sep 14</time>
          </div>
          <div className={"mt-2"}>
            <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
              <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                <circle cx="4" cy="4" r="3"/>
              </svg>
              <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
            </span>
          </div>
        </div>
      </a>
    </li>
  );
};