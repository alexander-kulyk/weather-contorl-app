const DEFAULT_COMPONENT_NAME = 'APP';

export const getComponentName = (component?: string): string =>
  component ?? DEFAULT_COMPONENT_NAME;
