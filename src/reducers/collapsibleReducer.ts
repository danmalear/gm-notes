import { UUID } from '../types/Crypto';

interface OpenCollapsibles {
  [key: UUID]: boolean;
}

export interface Collapsibles {
  openCollapsibles: OpenCollapsibles;
}

interface OpenToggledAction {
  type: 'openToggled';
  collapsibleId: UUID;
  isOpen: boolean;
}

interface CollapsiblesResetAction {
  type: 'collapsiblesReset';
}

export type CollapsiblesAction = OpenToggledAction | CollapsiblesResetAction;

type CollapsiblesReducer = (
  currentCollapsibles: Collapsibles,
  action: CollapsiblesAction,
) => Collapsibles;

const collapsiblesReducer: CollapsiblesReducer = (
  currentCollapsibles,
  action,
) => {
  switch (action.type) {
    case 'openToggled': {
      const { collapsibleId, isOpen } = action;

      return {
        ...currentCollapsibles,
        openCollapsibles: {
          ...currentCollapsibles.openCollapsibles,
          [collapsibleId]: isOpen,
        },
      };
    }
    case 'collapsiblesReset': {
      return {
        ...currentCollapsibles,
        openCollapsibles: {},
      };
    }
    default: {
      // @ts-expect-error TS is right this should never happen, but still here for safety
      throw Error(`Unhandled collapsible action: ${action.type}`);
    }
  }
};

export default collapsiblesReducer;
