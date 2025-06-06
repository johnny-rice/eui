/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  InputHTMLAttributes,
  FunctionComponent,
  useState,
  useMemo,
  useCallback,
  Ref,
} from 'react';
import classNames from 'classnames';

import { useCombinedRefs, useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import { useEuiI18n } from '../../i18n';
import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../../button';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';
import { EuiValidatableControl } from '../validatable_control';
import { useFormContext } from '../eui_form_context';

import { euiFieldPasswordStyles } from './field_password.styles';

export type EuiFieldPasswordProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value'
> &
  CommonProps & {
    isInvalid?: boolean;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    isLoading?: boolean;
    compressed?: boolean;
    inputRef?: Ref<HTMLInputElement>;

    /**
     * Creates an input group with element(s) coming before input.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: EuiFormControlLayoutProps['prepend'];

    /**
     * Creates an input group with element(s) coming after input.
     * `string` | `ReactElement` or an array of these
     */
    append?: EuiFormControlLayoutProps['append'];
    value?: string | number;

    /**
     * Change the `type` of input for manually handling obfuscation.
     * The `dual` option adds the ability to toggle the obfuscation of the input by
     * adding an icon button as the first `append` element
     * @default password
     */
    type?: 'password' | 'text' | 'dual';

    /**
     * Additional props to apply to the dual toggle. Extends EuiButtonIcon
     */
    dualToggleProps?: Partial<EuiButtonIconPropsForButton>;
  };

export const EuiFieldPassword: FunctionComponent<EuiFieldPasswordProps> = (
  props
) => {
  const { defaultFullWidth } = useFormContext();
  const {
    className,
    id,
    name,
    placeholder,
    value,
    disabled,
    isInvalid,
    fullWidth = defaultFullWidth,
    isLoading = false,
    compressed = false,
    inputRef: _inputRef,
    prepend,
    append,
    type = 'password',
    dualToggleProps,
    ...rest
  } = props;

  // Set the initial input type to `password` if they want dual
  const [inputType, setInputType] = useState(
    type === 'dual' ? 'password' : type
  );

  // Setup toggle aria-label
  const [showPasswordLabel, maskPasswordLabel] = useEuiI18n(
    ['euiFieldPassword.showPassword', 'euiFieldPassword.maskPassword'],
    [
      'Show password as plain text. Note: this will visually expose your password on the screen.',
      'Mask password',
    ]
  );

  // Setup the inputRef to auto-focus when toggling visibility
  const [inputRef, _setInputRef] = useState<HTMLInputElement | null>(null);
  const setInputRef = useCombinedRefs([_setInputRef, _inputRef]);

  const handleToggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, isVisible: boolean) => {
      setInputType(isVisible ? 'password' : 'text');
      inputRef?.focus();

      dualToggleProps?.onClick?.(event);
    },
    [inputRef, dualToggleProps]
  );

  // Add a toggling button to switch between `password` and `input` if consumer wants `dual`
  // https://www.w3schools.com/howto/howto_js_toggle_password.asp
  const visibilityToggle = useMemo(() => {
    if (type === 'dual') {
      const isVisible = inputType === 'text';

      return (
        <EuiButtonIcon
          iconType={isVisible ? 'eyeClosed' : 'eye'}
          aria-label={isVisible ? maskPasswordLabel : showPasswordLabel}
          title={isVisible ? maskPasswordLabel : showPasswordLabel}
          disabled={disabled}
          {...dualToggleProps}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleToggle(e, isVisible)
          }
        />
      );
    }
  }, [
    type,
    inputType,
    maskPasswordLabel,
    showPasswordLabel,
    dualToggleProps,
    handleToggle,
    disabled,
  ]);

  const finalAppend = useMemo(() => {
    if (!visibilityToggle) return append;
    if (!append) return visibilityToggle;

    // Convert any `append` elements to an array so the visibility
    // toggle can be added to it
    const appendAsArray = append
      ? Array.isArray(append)
        ? append
        : [append]
      : [];

    return [...appendAsArray, visibilityToggle];
  }, [append, visibilityToggle]);

  const classes = classNames(
    'euiFieldPassword',
    { 'euiFieldPassword-isLoading': isLoading },
    className
  );

  const styles = useEuiMemoizedStyles(euiFieldPasswordStyles);
  const cssStyles = [
    styles.euiFieldPassword,
    compressed ? styles.compressed : styles.uncompressed,
    fullWidth ? styles.fullWidth : styles.formWidth,
    (finalAppend || prepend) && styles.inGroup,
    type === 'dual' && styles.withToggle,
  ];

  return (
    <EuiFormControlLayout
      icon="lock"
      fullWidth={fullWidth}
      isLoading={isLoading}
      isInvalid={isInvalid}
      isDisabled={disabled}
      compressed={compressed}
      prepend={prepend}
      append={finalAppend}
    >
      <EuiValidatableControl isInvalid={isInvalid}>
        <input
          type={inputType}
          id={id}
          name={name}
          placeholder={placeholder}
          className={classes}
          css={cssStyles}
          value={value}
          disabled={disabled}
          ref={setInputRef}
          {...rest}
        />
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};
