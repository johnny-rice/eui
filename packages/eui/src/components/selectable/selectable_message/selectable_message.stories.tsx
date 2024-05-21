/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiSelectableMessage,
  EuiSelectableMessageProps,
} from './selectable_message';

const meta: Meta<EuiSelectableMessageProps> = {
  title: 'Forms/EuiSelectable/Subcomponents/EuiSelectableMessage',
  component: EuiSelectableMessage,
  args: {
    bordered: false,
  },
};

export default meta;
type Story = StoryObj<EuiSelectableMessageProps>;

export const Playground: Story = {
  args: {
    children: 'Custom selectable message',
  },
};
