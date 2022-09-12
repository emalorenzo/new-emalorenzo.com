import { MeshDistortMaterial, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { forwardRef, useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface Props {
  src: string;
  previewWidth?: number;
  previewHeight?: number;
  offset?: number;
  useAsHero?: boolean;
}

const HERO_POSITION = new THREE.Vector3(0, 0, 0);
const scale = new THREE.Vector3(3, 2, 1);

export const CursorImage = forwardRef(
  (props: Props, cursorRef: React.RefObject<THREE.Group>) => {
    const { src, previewWidth, previewHeight, offset, useAsHero } = props;
    const ref = useRef<THREE.Mesh>(null);
    const texture = useTexture(src);
    const { viewport } = useThree();

    useEffect(() => {
      const width = useAsHero ? viewport.width * 0.5 : previewWidth;
      const height = useAsHero ? viewport.height * 0.5 : previewHeight;
      scale.set(width, height, 1);
    }, [useAsHero]);

    useFrame(() => {
      if (ref.current) {
        if (useAsHero) {
          ref.current.position.lerp(HERO_POSITION, 0.02);
        } else {
          const x = cursorRef.current.position.x + previewWidth / 2 + offset;
          const y = cursorRef.current.position.y + previewHeight / 2 + offset;
          ref.current.position.set(x, y, 0);
        }

        ref.current.scale.lerp(scale, 0.05);
      }
    });

    return (
      <mesh ref={ref}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <MeshDistortMaterial speed={2} map={texture} />
      </mesh>
    );
  }
);

CursorImage.defaultProps = {
  previewWidth: 3,
  previewHeight: 2,
  offset: 0.2,
  useAsHero: false,
};