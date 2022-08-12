interface TheadProps {
  records: any[];
}
export const THeadRow = ({ records }: TheadProps) => {
  const keys = Object.keys(records[0]);
  return (
    <thead>
      <tr>
        {keys.map((key) => key !== 'id' && (

          <th key={key} className="whitespace-nowrap">
            {key.toUpperCase()}
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};
