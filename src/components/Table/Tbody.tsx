interface RowProps {
  records: any[];
}

export const TBodyRow = ({ records }: RowProps) => {
  const keys = Object.keys(records[0]);
  return (
    <>
      <tbody>
        {records.map((column, index) => (
          <tr key={index}>
            {keys.map((key) => (
              <td key={key} className="whitespace-nowrap">
                {column[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
};
