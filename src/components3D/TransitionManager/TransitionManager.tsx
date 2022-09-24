import { useRouter } from 'next/router';
import {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { CursorImageTransition } from '@/components3D';
import { useGlobalCanvasStore } from '@/store';
import type { ICursorImageTransition } from '@/store/globalCanvasStore';

const ROUTES = {
  home: '/',
  blog: '/blog',
  article: '/blog/[article]',
};

const TRANSITIONS = {
  home: {
    initial: {},
    blog: {},
  },
  blog: {
    initial: {},
    article: {},
  },
};

export const TransitionManager = () => {
  const transition = useGlobalCanvasStore((s) => s.transition);
  if (!transition) return null;

  // usar isActive rompe toda la app, habria que ver porqué
  // quizas castear a CursorImageTransition cuando transition es null?
  return (
    <CursorImageTransition
      isActive={transition?.type === 'cursor-image'}
      src={(transition as ICursorImageTransition)?.src}
      background={(transition as ICursorImageTransition)?.background}
    />
  );
};
