import { useEffect, useRef } from 'react';

import type { ITransition } from '@/components3D/TransitionManager/TransitionManager';
import { useTransitionStore } from '@/store';

/**
 * sets global transition
 */
export const useTransition = () => {
  const pendingTransitions = useRef<ITransition[]>([]);

  const transitionController = useTransitionStore(
    (s) => s.transitionControllerRef
  );

  // it could be that the transition is triggered before the transitionController is set
  // to prevent that we store the pending transitions if no controller is ready
  const setTransition = (transition: ITransition) => {
    if (transitionController?.current) {
      transitionController.current.setTransition(transition);
    } else {
      pendingTransitions.current.push(transition);
    }
  };

  const getTransition = () => {
    return transitionController?.current?.getTransition();
  };

  useEffect(() => {
    if (transitionController?.current) {
      pendingTransitions.current.forEach((transition) => {
        transitionController.current.setTransition(transition);
      });
    }
  }, [transitionController]);

  return {
    setTransition,
    getTransition,
  };
};
