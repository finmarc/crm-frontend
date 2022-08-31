interface TheadProps {
  records: any[];
}
export const THeadRow = ({ records }: TheadProps) => {

  return (
    <thead>
      <tr>
        {records.map((key) => key !== 'id' && (
          <th key={key} className="whitespace-nowrap">
            {key.toUpperCase()}
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};
