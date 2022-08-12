import {
  Lucide,
} from "@/base-components";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
interface RowProps {
  records: any[];
  component: string
}

export const TBodyRow = ({ records, component }: RowProps) => {
  const keys = Object.keys(records[0]);
  const history = useHistory();

  const show = useCallback((id: string) => {
    history.push(`${component}/show/${id}`)
  },[]);

  const edit = useCallback((id: string) => {
    history.push(`${component}/edit/${id}`)
  }, []);

  const remove = useCallback((id: string) => {
    alert(id)
  }, []);
  return (
    <>
      <tbody>
        {records.map((column, index) => (
          <tr key={index}>
            {keys.map((key) => key !== 'id' && (
              <td key={key} className="whitespace-nowrap">
                {column[key]}
              </td>
            ))}
            <td className="whitespace-nowrap ">
              <button className="btn btn-primary mr-1 mb-2" onClick={() => show(column['id'])}>
                <Lucide icon="Eye" className="w-5 h-5" />
              </button>
              <button className="btn btn-warning mr-1 mb-2" onClick={() => edit(column['id'])}>
                <Lucide icon="Edit" className="w-5 h-5" />
              </button>
              <button className="btn btn-danger mr-1 mb-2" onClick={() => remove(column['id'])}>
                <Lucide icon="Trash" className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};
