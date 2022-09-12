import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import * as THREE from 'three';

import { useBlobStore } from '@/store';

export type IBlobStatus = 'idle' | 'animate' | 'full';

export type BlobController = {
  setBlobStatus: (status: IBlobStatus) => void;
};

const targetScale = new THREE.Vector3();

export const Blob = () => {
  const [status, setStatus] = useState<IBlobStatus>('idle');
  const ref = useRef<THREE.Mesh>(null);
  const controllerRef = useRef<BlobController>(null);
  const { setBlobController } = useBlobStore.getState();
  const { viewport } = useThree();

  useImperativeHandle(controllerRef, () => ({
    setBlobStatus: (newStatus) => {
      setStatus(newStatus);
    },
  }));

  useEffect(() => {
    setBlobController(controllerRef);
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      if (status === 'idle' || status === 'animate') {
        const amplitude = status === 'idle' ? 0.5 : 1;
        targetScale.set(
          amplitude + Math.sin(clock.getElapsedTime()) * 0.1,
          amplitude + Math.sin(clock.getElapsedTime()) * 0.1,
          1
        );
      }

      if (status === 'full') {
        targetScale.set(viewport.width, viewport.width, 1);
      }

      ref.current.scale.lerp(targetScale, 0.01);
    }
  });

  return (
    <mesh ref={ref} position={[viewport.width / 2, -viewport.height / 2, 0]}>
      <circleGeometry args={[viewport.width / 8, 64]} />
    </mesh>
  );
};
