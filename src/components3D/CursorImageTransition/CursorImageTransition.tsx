import { MeshDistortMaterial, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { IMAGE_TRANSITION_Z } from '@/constants/zIndex';
import { DOMtoThreeCoords } from '@/lib/utils';
import { useCursorStore, useGlobalCanvasStore } from '@/store';

interface Props {
  isActive: boolean;
  src: string;
  background: string;
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

export const CursorImageTransition = ({ isActive, src, background }: Props) => {
  console.log('ImageTransition render', isActive);

  const ref = useRef<THREE.Mesh>(null);
  const cursorInitialRef = useRef(useCursorStore.getState().cursorPosition);
  const distortionRef = useRef<typeof MeshDistortMaterial>(null);
  const { setBlob } = useGlobalCanvasStore.getState();

  const texture = useTexture(src);
  const { viewport } = useThree();

  const initialPosition = DOMtoThreeCoords(
    cursorInitialRef.current.x,
    cursorInitialRef.current.y,
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
    if (!isActive) return;

    setBlob({
      status: 'full',
      color: background,
    });

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
      distort: 0.3,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to(ref.current.scale, {
      x: viewport.getCurrentViewport().width * 0.35,
      y: viewport.getCurrentViewport().height * finalHeightScale,
      duration: 1,
      ease: 'power2.inOut',
      delay: 0.5,
    });
    gsap.to(ref.current.position, {
      x: 0,
      y: viewport.getCurrentViewport().height * 0.15,
      duration: 1,
      ease: 'power2.inOut',
      delay: 0.5,
    });
    gsap.to(distortionRef.current, {
      distort: 0.1,
      duration: 1,
      ease: 'power2.inOut',
      delay: 1,
    });
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.mesh
          // @ts-ignore
          ref={ref}
          position={[
            initialPosition.x + initialScale.x / 2 + initialOffset,
            initialPosition.y + initialScale.y / 2 + initialOffset,
            IMAGE_TRANSITION_Z,
          ]}
          scale={initialScale}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <planeGeometry args={[1, 1, 32, 32]} />
          <MeshDistortMaterial ref={distortionRef} map={texture} speed={3} />
        </motion.mesh>
      )}
    </AnimatePresence>
  );
};
