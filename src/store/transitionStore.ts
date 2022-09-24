import create from 'zustand';

export interface IModelTransition {
  type: 'model';
}

export interface ICursorImageTransition {
  type: 'cursor-image';
  src: string;
  background: string;
}

export type ITransition = ICursorImageTransition | IModelTransition | null;

interface ITransitionStore {
  transition: ITransition;
  setTransition: (transition: ITransition) => void;
}

export const useTransitionStore = create<ITransitionStore>((set) => ({
  transition: null,
  setTransition: (transition) => {
    set((state) => ({ ...state, transition }));
  },
}));
