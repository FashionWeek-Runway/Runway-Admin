/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, {forwardRef, HTMLAttributes} from 'react'

import {cilFilterX} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

interface CSmartTableCleanerProps extends HTMLAttributes<HTMLButtonElement> {
  content?: string
  isFiltered?: string
}

export const CSmartTableCleaner = forwardRef<HTMLButtonElement, CSmartTableCleanerProps>(
  ({content = <CIcon width={18} icon={cilFilterX} />, isFiltered, ...rest}, ref) => {
    return (
      <button
        type='button'
        className='btn btn-transparent'
        {...(!isFiltered && {
          disabled: true,
          tabIndex: -1,
        })}
        {...rest}
        ref={ref}
      >
        {content}
      </button>
    )
  },
)

CSmartTableCleaner.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string]),
  isFiltered: PropTypes.string,
}

CSmartTableCleaner.displayName = 'CSmartTableCleaner'
