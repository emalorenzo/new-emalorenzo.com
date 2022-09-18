import { MeshDistortMaterial, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { IMAGE_TRANSITION_Z } from '@/constants/zIndex';
import { DOMtoThreeCoords } from '@/lib/utils';
import { useCursorStore } from '@/store';

type Status = 'cursor' | 'full' | 'compact';

interface Props {
  src: string;
  cursorToFullDuration?: number;
  fullToCompactDuration?: number;
}

const HERO_POSITION = new THREE.Vector3(0, 0, 0);
const initialScale = new THREE.Vector3(3, 2, 1);
const initialOffset = 0.2;
const scaleCursor = new THREE.Vector3(3, 2, 1);
const scaleFull = 0.5;
const finalHeightScale = 0.4;
const scaleCompact = new THREE.Vector3(3, 2, 1);

const targetPosition = new THREE.Vector3(0, 0, IMAGE_TRANSITION_Z);
const targetScale = new THREE.Vector3(3, 2, 1);

export const CursorImageTransition = ({
  src,
  cursorToFullDuration,
  fullToCompactDuration,
}: Props) => {
  console.log('ImageTransition render');

  const ref = useRef<THREE.Mesh>(null);
  const distortionRef = useRef<typeof MeshDistortMaterial>(null);
  const status = useRef<Status>('cursor');
  const targetDistortionSpeed = useRef(2);

  const texture = useTexture(src);
  const { viewport } = useThree();

  const { cursorPosition } = useCursorStore.getState();
  const initialPosition = DOMtoThreeCoords(
    cursorPosition.x,
    cursorPosition.y,
    viewport
  );
  // const initialPosition = useRef();

  // const [status, setStatus] = useState<Status>('cursor');

  // const width = {
  //   cursor: scaleCursor.x,
  //   full: viewport.getCurrentViewport().width * scaleFull,
  //   compact: scaleCompact.x,
  // }[status];

  // const height = {
  //   cursor: scaleCursor.y,
  //   full: viewport.getCurrentViewport().height * scaleFull,
  //   compact: scaleCompact.y,
  // }[status];

  // useEffect(() => {
  //   scale.set(width, height, 1);
  // }, [status]);

  useEffect(() => {
    gsap.to(ref.current.scale, {
      x: viewport.getCurrentViewport().width * scaleFull,
      y: viewport.getCurrentViewport().height * scaleFull,
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(ref.current.position, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(distortionRef.current, {
      distort: 0.4,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to(ref.current.scale, {
      x: viewport.getCurrentViewport().width * 0.35,
      y: viewport.getCurrentViewport().height * finalHeightScale,
      duration: 1,
      ease: 'power2.out',
      delay: 1,
    });
    gsap.to(ref.current.position, {
      x: 0,
      y: viewport.getCurrentViewport().height * 0.15,
      duration: 1,
      ease: 'power2.out',
      delay: 1,
    });
    gsap.to(distortionRef.current, {
      distort: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 1,
    });
  }, []);

  // useFrame(() => {
  //   if (ref.current) {
  //     if (useAsHero) {
  //       ref.current.position.lerp(HERO_POSITION, 0.02);
  //     } else {
  //       const x = cursorRef.current.position.x + previewWidth / 2 + offset;
  //       const y = cursorRef.current.position.y + previewHeight / 2 + offset;
  //       ref.current.position.set(x, y, 0);
  //     }

  //     ref.current.scale.lerp(scale, 0.05);
  //   }
  // });

  return (
    <mesh
      ref={ref}
      position={[
        initialPosition.x + initialScale.x / 2 + initialOffset,
        initialPosition.y + initialScale.y / 2 + initialOffset,
        IMAGE_TRANSITION_Z,
      ]}
      scale={initialScale}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial ref={distortionRef} map={texture} />
    </mesh>
  );
};

CursorImageTransition.defaultProps = {
  cursorToFullDuration: 0.5,
  fullToCompactDuration: 0.5,
};
