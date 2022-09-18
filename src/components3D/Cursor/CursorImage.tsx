import { MeshDistortMaterial, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import React, { forwardRef, useEffect, useRef } from 'react';
import type * as THREE from 'three';

import { IMAGE_CURSOR_Z } from '@/constants/zIndex';
import { useTransition } from '@/hooks';

export interface Props {
  src: string;
  previewWidth?: number;
  previewHeight?: number;
  offset?: number;
}

export const CursorImage = forwardRef(
  (props: Props, cursorRef: React.RefObject<THREE.Group>) => {
    const { src, previewWidth, previewHeight, offset } = props;
    const ref = useRef<THREE.Mesh>(null);
    const texture = useTexture(src);

    const { getTransition } = useTransition();
    const transition = getTransition();

    useFrame(() => {
      if (ref.current) {
        // offset the image from the cursor
        // so it's at bottom left corner + offset
        const x = cursorRef.current.position.x + previewWidth / 2 + offset;
        const y = cursorRef.current.position.y + previewHeight / 2 + offset;
        ref.current.position.set(x, y, IMAGE_CURSOR_Z);
      }
    });

    useEffect(() => {
      console.log('TRANSITION', transition);
    }, [transition]);

    return (
      <AnimatePresence>
        {transition?.type !== 'cursor-image' && (
          <motion.mesh
            // @ts-ignore
            ref={ref}
            scale={[previewWidth, previewHeight, 1]}
            exit={{ opacity: 0 }}
          >
            <planeGeometry args={[1, 1, 32, 32]} />
            <MeshDistortMaterial speed={2} map={texture} />
          </motion.mesh>
        )}
      </AnimatePresence>
    );
  }
);

CursorImage.defaultProps = {
  previewWidth: 3,
  previewHeight: 2,
  offset: 0.2,
};
