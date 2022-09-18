import type { ITransition } from '@/components3D/TransitionManager/TransitionManager';
import { useTransitionStore } from '@/store';

/**
 * sets global transition
 */
export const useTransition = () => {
  const transitionController = useTransitionStore(
    (s) => s.transitionControllerRef
  );

  const setTransition = (transition: ITransition) => {
    transitionController?.current?.setTransition(transition);
  };

  const getTransition = () => {
    return transitionController?.current?.getTransition();
  };

  return {
    setTransition,
    getTransition,
  };
};
