import Column from './Column/Column';
import './List.css';

const List = ({ columns, gridArea = 'list', active, setActive }) => {
  return (
    <div className='list' style={{ gridArea }}>
      {columns &&
        columns.map((col) => {
          return (
            <Column
              name={col.name}
              values={col.values}
              active={active}
              setActive={setActive}
            />
          );
        })}
    </div>
  );
};

export default List;
