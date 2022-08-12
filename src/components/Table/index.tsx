import { TBodyRow } from "./Tbody";
import { THeadRow } from "./Thead";


type DataProps = {
  columns: any[];
  component: string;
};
export const Table = (data: DataProps) => {
  return (
    <div className="intro-y box p-5 mt-5">
      <div className="overflow-x-auto">
        <table className="table">
          <THeadRow records={data.columns} />
          <TBodyRow component={data.component} records={data.columns} />
        </table>
      </div>
    </div>
  );
};
