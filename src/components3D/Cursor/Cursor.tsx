import { useFrame, useThree } from '@react-three/fiber';
import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';

import { DOMtoThreeCoords } from '@/lib/utils';
import { useCursorStore, useTransitionStore } from '@/store';

import type { Props as ImageProps } from './CursorImage';
import { CursorImage } from './CursorImage';

const cursorTargetPosition = new THREE.Vector3();

interface CursorDefault {
  type: 'default';
}
interface CursorImage {
  type: 'image';
  config: ImageProps;
}

export type ICursor = CursorDefault | CursorImage;

export interface ICursorPosition {
  x: number;
  y: number;
}

export type CursorController = {
  setCursor: (cursor: ICursor) => void;
};

export const Cursor = () => {
  const ref = useRef<THREE.Group>(null);
  const controllerRef = useRef<CursorController>(null);
  const cursorPosition = useRef(useCursorStore.getState().cursorPosition);
  const { setCursorController } = useCursorStore.getState();
  const transition = useTransitionStore((s) => s.transition);

  const [cursor, setCursor] = useState<ICursor>(null);

  useImperativeHandle(controllerRef, () => ({
    setCursor: (newCursor) => {
      setCursor(newCursor);
    },
  }));

  useEffect(() => {
    setCursorController(controllerRef);
    // subscribe to cursor position
    useCursorStore.subscribe((state) => {
      cursorPosition.current = state.cursorPosition;
    });
  }, []);

  const { viewport } = useThree();
  useFrame(() => {
    if (ref.current) {
      const { x, y } = DOMtoThreeCoords(
        cursorPosition.current.x,
        cursorPosition.current.y,
        viewport
      );

      cursorTargetPosition.set(x, y, 0);
      ref.current.position.lerp(cursorTargetPosition, 0.1);
    }
  });

  const renderCursor = useMemo(() => {
    console.log('render cursor');
    return {
      image: () =>
        transition?.type !== 'cursor-image' ? (
          <CursorImage ref={ref} {...(cursor as CursorImage).config} />
        ) : null,
    }[cursor?.type];
  }, [transition, cursor]);

  return (
    <>
      {/* <Trail
        width={1} // Width of the line
        color="hotpink" // Color of the line
        length={1} // Length of the line
        decay={1} // How fast the line fades away
        local={false} // Wether to use the target's world or local positions
        stride={0} // Min distance between previous and current point
        interval={1} // Number of frames to wait before next calculation
        target={ref} // Optional target. This object will produce the trail.
        attenuation={(width) => width}
      > */}
      {/* If `target` is not defined, Trail will use the first `Object3D` child as the target. */}

      {/* You can optionally define a custom meshLineMaterial to use. */}
      {/* <meshLineMaterial color={"red"} /> */}
      {/* </Trail> */}
      <group ref={ref}>
        {/* <mesh scale={0.2}>
          <sphereGeometry />
          <meshBasicMaterial />
        </mesh> */}
      </group>

      {renderCursor && renderCursor()}
    </>
  );
};
