/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  Context,
  FunctionComponent,
  ReactNode,
} from 'react';

export interface RenderableValues {
  // undefined values are ignored, but including support here improves usability
  [key: string]: ReactNode | undefined;
}

export type Renderable<T> = ReactNode | ((values: T) => ReactNode);

export interface I18nShape {
  mapping?: {
    [key: string]: Renderable<object>;
  };
  mappingFunc?: (value: string) => string;
  /**
   * Some browsers' translation features don't work with a rendered `<Fragment>` component.
   * The `render` function allows you to pass in another component instead, e.g. `<div>`
   */
  render?: (children: any) => FunctionComponent;
  formatNumber?: (x: number) => string;
  formatDateTime?: (x: Date) => string;
  locale?: string;
}

const I18nContext: Context<I18nShape> = createContext({});
const { Provider: EuiI18nProvider, Consumer: EuiI18nConsumer } = I18nContext;

export interface EuiContextProps {
  i18n: I18nShape;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
}

const EuiContext: FunctionComponent<EuiContextProps> = ({
  i18n = {},
  children,
}) => <EuiI18nProvider value={i18n}>{children}</EuiI18nProvider>;

export { EuiContext, EuiI18nConsumer, I18nContext };
