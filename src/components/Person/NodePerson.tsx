import React from "react";
import { Handle, Position } from "reactflow";
import useImage from "../../utils/useImage";
import "./Person.scss";
import { useAppDispatch } from "../../services/app/hooks";
import { setActiveCard } from "../../services/slices/activeCardSlice";

// interface IPerson {
//   imageLink?: string;
//   personName?: string;
//   date?: string;
// }

interface IPerson {
  data: {
    id: number;
    imageLink?: string;
    personName?: string;
    date?: string;
    // onClick: () => any;
  };
  isConnectable: any;
}

function NodePerson({
  data: {
    id,
    imageLink = "https://www.coloradospecialties.com/wp-content/uploads/2013/12/Person.Ashley.jpg",
    personName = "Иван Иванович Иванов",
    date = "01.01.1900 - 12.12.1999"
    // onClick
  },
  isConnectable
}: IPerson) {
  const dispatch = useAppDispatch();
  const sectionRef = React.useRef(null);

  // Возможно, тут стоит всё же навесить обработчик ошибок. Для этого пригодятся все переменные из хука:
  // const { loading, error, image } = useImage(fileName)
  const { image } = useImage(imageLink);

  console.log(id);

  const handleClick = () => {
    console.log("azaza");
    dispatch(setActiveCard(id));
  };

  return (
    <div>
      <Handle
        type="target"
        isConnectableStart={false}
        position={Position.Top}
        id="child"
        isConnectable={isConnectable}
      />
      {/* eslint-disable-next-line */}
      <section className="person" ref={sectionRef} onClick={handleClick}>
        <img className="person__image" src={image} alt="person" />
        <span className="person__name">{personName}</span>
        <span className="person__date">{date}</span>
      </section>
      <Handle
        type="target"
        position={Position.Left}
        id="man_partner"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="woman_partner"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="parent"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default NodePerson;
