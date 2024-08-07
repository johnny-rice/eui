/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const EuiIconAnomalySwimLane = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1 5V1h4v4H1Zm3-1V2H2v2h2Zm7 1V1h4v4h-4Zm1-1h2V2h-2v2ZM1 10V6h4v4H1Zm3-1V7H2v2h2Zm2 6v-4h4v4H6Zm1-1h2v-2H7v2Zm4 1v-4h4v4h-4Zm1-1h2v-2h-2v2Zm-1-8h4v4h-4V6ZM6 6h4v4H6V6Zm-5 5h4v4H1v-4ZM6 1h4v4H6V1Z" />
  </svg>
);
export const icon = EuiIconAnomalySwimLane;
