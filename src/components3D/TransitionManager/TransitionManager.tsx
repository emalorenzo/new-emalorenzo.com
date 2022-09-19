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

export interface ModelTransition {
  type: 'model';
}

export interface CursorImageTransition {
  type: 'cursor-image';
  src: string;
  background: string;
}

export type ITransition = CursorImageTransition | ModelTransition | null;

export type TransitionController = {
  setTransition: (transition: ITransition) => void;
  getTransition: () => ITransition;
};

export const TransitionManager = () => {
  const transition = useTransitionStore((s) => s.transition);
  if (!transition) return null;

  // usar isActive rompe toda la app, habria que ver porqué
  // quizas castear a CursorImageTransition cuando transition es null?
  return (
    <CursorImageTransition
      isActive={transition?.type === 'cursor-image'}
      src={(transition as CursorImageTransition)?.src}
      background={(transition as CursorImageTransition)?.background}
    />
  );
};
