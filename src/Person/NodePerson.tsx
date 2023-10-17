import React from "react";
import { Handle, Position } from "reactflow";
import "./Person.scss";

interface IPerson {
  imageLink?: string;
  name?: string;
  date?: string;
  // data?: any;
  isConnectable?: any;
}

const handleStyle = { left: 10 };

function NodePerson({
  imageLink = "https://www.coloradospecialties.com/wp-content/uploads/2013/12/Person.Ashley.jpg",
  name = "Иван Иванович Иванов",
  date = "01.01.1900 - 12.12.1999",
  // data,
  isConnectable
}: IPerson) {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <section className="person">
        <img className="person__image" src={imageLink} alt="person" />
        <span className="person__name">{name}</span>
        <span className="person__date">{date}</span>
      </section>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default NodePerson;
