import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import * as THREE from 'three';

import { useBlobStore } from '@/store';

export type IBlobStatus = 'idle' | 'preview' | 'full';

interface StatusIdle {
  status: 'idle';
}

interface StatusAnimate {
  status: 'preview';
  color: string;
}

interface StatusFull {
  status: 'full';
  color: string;
}

export type IBlob = StatusIdle | StatusAnimate | StatusFull;

export type BlobController = {
  setBlob: (blob: IBlob) => void;
};

const targetScale = new THREE.Vector3();

export const Blob = ({ color }) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const controllerRef = useRef<BlobController>(null);
  const isAnimationLocked = useRef(false);
  const { setBlobController } = useBlobStore.getState();
  const { viewport } = useThree();

  const [blob, setBlob] = useState<IBlob>({ status: 'idle' });
  const { status } = blob;
  const targetColor = status === 'idle' ? color : blob.color;

  useImperativeHandle(controllerRef, () => ({
    setBlob: (newBlob) => {
      if (
        !(
          status === 'full' &&
          ref.current.scale.x < viewport.getCurrentViewport().width * 0.9
        )
      ) {
        setBlob(newBlob);
      }
    },
  }));

  useEffect(() => {
    setBlobController(controllerRef);
  }, []);

  useEffect(() => {
    isAnimationLocked.current = true;
    gsap.to(ref.current.scale, {
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(ref.current.scale, {
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    window.setTimeout(() => {
      isAnimationLocked.current = false;
      materialRef.current.color.set(targetColor);
    }, 500);
  }, [targetColor]);

  // useEffect(() => {
  //   if (status === 'full') {
  //     gsap.to(ref.current.scale, {
  //       x: viewport.width,
  //       duration: 1,
  //       ease: 'power2.out',
  //     });
  //     gsap.to(ref.current.scale, {
  //       y: viewport.width,
  //       duration: 1,
  //       ease: 'power2.out',
  //     });
  //   }
  // }, [status]);

  useFrame(({ clock }) => {
    if (ref.current && !isAnimationLocked.current) {
      if (status === 'idle' || status === 'preview') {
        const amplitude = status === 'idle' ? 0.5 : 1;
        targetScale.set(
          amplitude + Math.sin(clock.getElapsedTime()) * 0.1,
          amplitude + Math.sin(clock.getElapsedTime()) * 0.1,
          1
        );
      }

      if (status === 'full') {
        targetScale.set(
          viewport.getCurrentViewport().width,
          viewport.getCurrentViewport().width,
          1
        );
      }

      ref.current.scale.lerp(targetScale, status === 'full' ? 0.01 : 0.05);
    }
  });

  return (
    <mesh
      ref={ref}
      position={[viewport.width / 2, -viewport.height / 2, 0]}
      scale={0}
    >
      <circleGeometry args={[viewport.width / 8, 64]} />
      <meshBasicMaterial ref={materialRef} />
    </mesh>
  );
};

Blob.defaultProps = {
  color: '#212121',
};
