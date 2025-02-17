/**
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import Link from "react-router";

export const Link = forwardRef(function Link(props, ref) {
  return (
    <Headless.DataInteractive>
      <Link {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
