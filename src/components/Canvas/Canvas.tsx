import React, { useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef
} from "react-zoom-pan-pinch";
// import Person from "../Person/Person";
import Board from "../Board/Board";

type Test = {
  zoomIn: any;
  zoomOut: any;
  resetTransform: any;
};

function Controls({ zoomIn, zoomOut, resetTransform }: Test) {
  return (
    <>
      <button type="button" onClick={() => zoomIn()}>
        +
      </button>
      <button type="button" onClick={() => zoomOut()}>
        -
      </button>
      <button type="button" onClick={() => resetTransform()}>
        x
      </button>
    </>
  );
}

function Component() {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  // const zoomToImage = () => {
  //   if (transformComponentRef.current) {
  //     const { zoomToElement } = transformComponentRef.current;
  //     zoomToElement("imgExample");
  //   }
  // };

  return (
    <TransformWrapper
      initialScale={0.25}
      initialPositionX={200}
      initialPositionY={100}
      minScale={0.25}
      centerOnInit
      ref={transformComponentRef}
    >
      {(utils) => (
        <>
          <Controls {...utils} />
          <TransformComponent>
            <Board />
            {/* eslint-disable-next-line */}
            {/* <div onClick={zoomToImage}>Example text</div> */}
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}

export { Controls, Component };
