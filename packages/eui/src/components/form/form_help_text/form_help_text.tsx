/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

import { euiFormHelpTextStyles } from './form_help_text.styles';

export type EuiFormHelpTextProps = CommonProps & HTMLAttributes<HTMLDivElement>;

export const EuiFormHelpText: FunctionComponent<EuiFormHelpTextProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiFormHelpText', className);
  const styles = useEuiMemoizedStyles(euiFormHelpTextStyles);

  return (
    <div css={styles.euiFormHelpText} className={classes} {...rest}>
      {children}
    </div>
  );
};
