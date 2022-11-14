import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { TBodyRow } from "./Tbody";
import { THeadRow } from "./Thead";

type DataProps = {
  titles: any[];
  columns: any[];
  component: string;
  url: string;
};
export const Table = (data: DataProps) => {
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const MAX_ITEMS = 9;

  const paginate = (items = data.columns, perPage = 10) => {
    const offset = perPage * (page - 1);
    const totalPages = Math.ceil(items.length / perPage);
    const paginatedItems = items.slice(offset, perPage * page);

    return {
      previousPage: page - 1 ? page - 1 : null,
      nextPage: (totalPages > page) ? page + 1 : null,
      total: items.length,
      totalPages: totalPages,
      items: paginatedItems,
      perPage
    };
  };

  useEffect(() => {
    setOffset(paginate().items.length);
  },[offset])

  return (
    <div className="intro-y box p-5 mt-5">
      <div className="overflow-x-auto">
        <table className="table">
          <THeadRow records={data?.titles} />
          <TBodyRow component={data?.component} dataList={paginate().items} url={data?.url} />
        </table>
        <Pagination
          limit={paginate().perPage}
          total={data.columns.length}
          offset={offset}
          setOffset={setOffset}
          pageActive={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
