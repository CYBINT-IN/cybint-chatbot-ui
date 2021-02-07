import "./Example.css";

const Example = ({ gridArea = "example", para1, para2 }) => {
  return (
    <div className="example" style={{ gridArea }}>
      <h3>Example</h3>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
        voluptates nesciunt recusandae
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
        voluptates nesciunt recusandae
      </p>
    </div>
  );
};

export default Example;
