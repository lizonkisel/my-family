import React from "react";
import "./CardPerson.scss";

export default function CardPerson({ personId }: { personId: number }) {
  console.log(personId);
  return <p className="test">Test: {personId}</p>;
}
