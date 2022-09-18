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

const RenderTransition = ({ transition }) => {
  if (transition?.type === 'cursor-image') {
    return (
      <CursorImageTransition src={(transition as CursorImageTransition).src} />
    );
  }
  return null;
};

export const TransitionManager = () => {
  const controllerRef = useRef<TransitionController>(null);
  const { pathname } = useGlobalStore((s) => s.router);
  const { setTransitionController } = useTransitionStore.getState();

  const [transition, setTransition] = useState<ITransition | null>(null);

  const { setBlob } = useBlob();

  useImperativeHandle(controllerRef, () => ({
    setTransition: (newTransition) => {
      setTransition(newTransition);
    },
    getTransition: () => {
      return transition;
    },
  }));

  useEffect(() => {
    setTransitionController(controllerRef);
  }, []);

  console.log('transition', transition);

  useEffect(() => {
    if (transition?.type === 'cursor-image') {
      setBlob({
        status: 'full',
        color: (transition as CursorImageTransition).background,
      });
    }
  }, [transition]);

  return <RenderTransition transition={transition} />;
};
