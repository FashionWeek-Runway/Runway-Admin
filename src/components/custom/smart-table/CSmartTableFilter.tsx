import React, {forwardRef, HTMLAttributes} from 'react'
import PropTypes from 'prop-types'

import {CFormLabel} from '@coreui/react'
import {CFormInput} from '@coreui/react'

interface CSmartTableFilterProps extends HTMLAttributes<HTMLInputElement> {
  // TODO: consider to simplify ex. filterLabel --> label
  filterLabel?: string
  filterPlaceholder?: string
  value?: string | number
}

export const CSmartTableFilter = forwardRef<HTMLInputElement, CSmartTableFilterProps>(
  ({filterLabel, filterPlaceholder, value, ...rest}, ref) => {
    return (
      <div className='row mb-2'>
        <CFormLabel className='col-sm-auto col-form-label'>{filterLabel}</CFormLabel>
        <div className='col-sm-auto'>
          <CFormInput placeholder={filterPlaceholder} value={value} {...rest} ref={ref} />
        </div>
      </div>
    )
  },
)

CSmartTableFilter.propTypes = {
  filterLabel: PropTypes.string,
  filterPlaceholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

CSmartTableFilter.displayName = 'CSmartTableFilter'
