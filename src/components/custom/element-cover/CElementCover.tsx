import PropTypes from 'prop-types'
import React, {CSSProperties, forwardRef, HTMLAttributes, useEffect, useRef, useState} from 'react'
import classNames from 'classnames'

import {useForkedRef} from '../hooks'
import {CSpinner} from '../spinner/CSpinner'

interface CElementCoverProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component. [docs]
   */
  className?: string
  /**
   * Array of custom boundaries. Use to create custom cover area (instead of parent element area). Area is defined by four sides: 'top', 'bottom', 'right', 'left'. If side is not defined by any custom boundary it is equal to parent element boundary. Each custom boundary is object with keys:
   * - sides (array) - select boundaries of element to define boundaries. Sides names: 'top', 'bottom', 'right', 'left'.
   * - query (string) - query used to get element which define boundaries. Search will be done only inside parent element, by parent.querySelector(query) function. [docs]
   *
   * @type {sides: string[], query: string}[]
   */
  boundaries?: {sides: string[]; query: string}[] // TODO: check if this is correct, TJ
  /**
   * Opacity of the cover. [docs]
   *
   * @type number
   */
  opacity?: number
}
export const CElementCover = forwardRef<HTMLDivElement, CElementCoverProps>(
  ({children, className, boundaries, opacity = 0.4, ...rest}, ref) => {
    const elementCoverRef = useRef<HTMLDivElement>(null)
    const forkedRef = useForkedRef(ref, elementCoverRef)

    const [customBoundaries, setCustomBoundaries] = useState({})

    const getCustomBoundaries = () => {
      if (!elementCoverRef || !elementCoverRef.current || !boundaries) {
        return {}
      }
      const parent = elementCoverRef.current.parentElement
      if (!parent) {
        return {}
      }
      const parentCoords = parent.getBoundingClientRect()
      const customBoundaries = {}
      boundaries.forEach(({sides, query}) => {
        const element = parent.querySelector(query)
        if (!element || !sides) {
          return
        }
        const coords = element.getBoundingClientRect()
        sides.forEach(side => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const sideMargin = Math.abs(coords[side] - parentCoords[side])
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          customBoundaries[side] = `${sideMargin}px`
        })
      })
      return customBoundaries
    }

    useEffect(() => {
      setCustomBoundaries(getCustomBoundaries())
    }, [JSON.stringify(getCustomBoundaries())])

    //render

    const classes = classNames(className)

    const containerCoords = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      ...customBoundaries,
    }

    const coverStyles: CSSProperties = {
      ...containerCoords,
      position: 'absolute',
      backgroundColor: `rgb(255,255,255,${opacity})`,
    }

    return (
      <div className={classes} style={coverStyles} {...rest} ref={forkedRef}>
        {children || (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
            }}
          >
            <CSpinner variant='grow' color='primary' />
          </div>
        )}
      </div>
    )
  },
)

CElementCover.propTypes = {
  boundaries: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
  opacity: PropTypes.number,
}

CElementCover.displayName = 'CElementCover'
