import { useRouter } from 'next/router';
import {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { CursorImageTransition } from '@/components3D';
import { useBlob } from '@/hooks';
import { useGlobalStore } from '@/store';
import type { ICursorImageTransition } from '@/store/transitionStore';
import { useTransitionStore } from '@/store/transitionStore';

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
  const transition = useTransitionStore((s) => s.transition);
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
