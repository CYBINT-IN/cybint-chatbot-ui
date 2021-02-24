import './Column.css';

const Column = ({ name, values, gridArea = 'column', active, setActive }) => {
  return (
    <div className='column' style={{ gridArea }}>
      <div className='btn dark'>{name}</div>
      {values &&
        values.map(({ data, id }) => {
          return (
            <div
              className='btn light'
              style={active === id ? { backgroundColor: '#82858b' } : {}}
              onClick={() => setActive(id)}
            >
              {data}
            </div>
          );
        })}
    </div>
  );
};

export default Column;
