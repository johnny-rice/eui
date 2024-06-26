/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ChangeEvent,
  InputHTMLAttributes,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

import { euiHueStyles } from './hue.styles';

const HUE_RANGE = 359;

export type EuiHueProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> &
  CommonProps & {
    hex?: string;
    hue?: string | number;
    onChange: (hue: number) => void;
  };

export const EuiHue: FunctionComponent<EuiHueProps> = ({
  className,
  hex,
  hue = 1,
  id,
  onChange,
  ...rest
}) => {
  const classes = classNames('euiHue', className);
  const styles = useEuiMemoizedStyles(euiHueStyles);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div css={styles.euiHue} className={classes}>
      <EuiScreenReaderOnly>
        <label htmlFor={`${id}-hue`}>
          <EuiI18n
            token="euiHue.label"
            default="Select the HSV color mode 'hue' value"
          />
        </label>
      </EuiScreenReaderOnly>
      <EuiScreenReaderOnly>
        <p aria-live="polite">{hex}</p>
      </EuiScreenReaderOnly>
      <input
        id={`${id}-hue`}
        min={0}
        max={HUE_RANGE}
        step={1}
        type="range"
        css={styles.euiHue__range}
        className="euiHue__range"
        value={hue}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};
