import React from "react";
import { Handle, Position } from "reactflow";
import "./Person.scss";

// interface IPerson {
//   imageLink?: string;
//   personName?: string;
//   date?: string;
// }

interface IPerson {
  data: {
    imageLink?: string;
    personName?: string;
    date?: string;
  };
  isConnectable: any;
}

function NodePerson({
  data: {
    imageLink = "https://www.coloradospecialties.com/wp-content/uploads/2013/12/Person.Ashley.jpg",
    personName = "Иван Иванович Иванов",
    date = "01.01.1900 - 12.12.1999"
  },
  isConnectable
}: IPerson) {
  return (
    <div>
      <Handle
        type="target"
        isConnectableStart={false}
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <section className="person">
        <img className="person__image" src={imageLink} alt="person" />
        <span className="person__name">{personName}</span>
        <span className="person__date">{date}</span>
      </section>
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
