import "./Column.css";

const Column = ({ name, values, gridArea = "column" }) => {
  return (
    <div className="column" style={{ gridArea }}>
      <div className="btn dark">{name}</div>
      {values &&
        values.map((val) => {
          return <div className="btn light">{val}</div>;
        })}
    </div>
  );
};

export default Column;
