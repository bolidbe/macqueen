import React, { ReactNode } from 'react';
import { clamp, noop } from 'lodash';
import classNames from 'classnames';

import styles from './Base.module.scss';

// Total number of stars
export const MAX_NUM_STARS = 5;

// Smallest increment we render
const PRECISION = 0.5;

export interface StarRatingBasePropsType {
  rating: number | string;
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
  onMouseLeave?: () => void;
  className?: string;
}

export default function StarRatingBase({
  rating,
  size = 'small',
  children,
  onMouseLeave = noop,
  className
}: StarRatingBasePropsType): JSX.Element {
  // Limit rating to between 0 and MAX_NUM_STARS
  // @ts-ignore
  const clampedRating = clamp(rating, 0, MAX_NUM_STARS);

  // Round rating to PRECISION (e.g, 2.7 --> 2.5).
  const ratingValue = Math.round(clampedRating / PRECISION) * PRECISION;

  // aria-label text
  const ariaStarText = ratingValue === 1 ? 'star' : 'stars';
  const ariaLabel = `${ratingValue} ${ariaStarText} out of ${MAX_NUM_STARS} star rating`;

  return (
    <div
      className={classNames({
        [styles.starRating]: true,
        [styles.starRatingSizeSmall]: size === 'small',
        [styles.starRatingSizeMedium]: size === 'medium',
        [styles.starRatingSizeLarge]: size === 'large',
      }, className)}
      data-star={ratingValue}
      aria-label={ariaLabel}
      onMouseLeave={onMouseLeave}
    >
      { children }
    </div>
  );
}
