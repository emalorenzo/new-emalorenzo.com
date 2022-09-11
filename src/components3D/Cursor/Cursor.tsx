import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import * as THREE from 'three';

import { DOMtoThreeCoords } from '@/lib/utils';
import { useCursorStore } from '@/store';

import type { Props as ImageProps } from './CursorImage';
import { CursorImage } from './CursorImage';

const cursorTargetPosition = new THREE.Vector3();

export interface ICursor {
  type: 'none' | 'image';
  config: ImageProps;
}

export type CursorController = {
  setCursor: (cursor: ICursor) => void;
};

export const Cursor = () => {
  console.log('render cursor');
  const ref = useRef<THREE.Group>(null);
  const controllerRef = useRef<CursorController>(null);
  const cursorPosition = useRef(useCursorStore.getState().cursorPosition);
  const { setCursorController } = useCursorStore.getState();

  const [cursor, setCursor] = useState<ICursor>(null);

  useImperativeHandle(controllerRef, () => ({
    setCursor: (newCursor) => {
      // TODO: maybe only checking the type is not enough
      // if its the same type but different config it wont update
      if (newCursor.type !== cursor?.type) {
        setCursor(newCursor);
      }
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

  const renderCursor = {
    image: () => <CursorImage {...cursor.config} />,
  }[cursor?.type];

  return <group ref={ref}>{renderCursor && renderCursor()}</group>;
};
