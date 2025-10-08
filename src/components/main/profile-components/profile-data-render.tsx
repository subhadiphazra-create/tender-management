const TabRenderer = ({
  fields,
  data,
}: {
  fields: Record<string, string>;
  data: any;
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 text-gray-300">
      {Object.entries(fields).map(([key, label]) => (
        <div key={key} className="flex flex-col">
          <span className="font-semibold">{label}</span>
          <span className="text-gray-500">{data[key] ?? "N/A"}</span>
        </div>
      ))}
    </div>
  );
};

export default TabRenderer;
