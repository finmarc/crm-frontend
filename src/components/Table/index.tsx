import { TBodyRow } from "./Tbody";
import { THeadRow } from "./Thead";


type DataProps = {
  columns: any[];
};
export const Table = (data: DataProps) => {
  return (
    <div className="intro-y box p-5 mt-5">
      <div className="overflow-x-auto">
        <table className="table">
          <THeadRow records={data.columns} />
          <TBodyRow records={data.columns} />
        </table>
      </div>
    </div>
  );
};
