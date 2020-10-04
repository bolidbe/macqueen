import React from 'react';
import { clamp, times, noop } from 'lodash';
import classNames from 'classnames';
import styles from './StarRating.module.scss';

// Total number of stars
const MAX_NUM_STARS = 5;

// Smallest increment we render
const PRECISION = 0.5;

interface StarRatingPropsType {
  rating: number,
  hoverRating?: 0 | 1 | 2 | 3 | 4 | 5,
  size?: 'small' | 'medium' | 'large',
  onStarClick?: (value: number) => void,
  onStarHover?: (value: number) => void,
  onMouseLeave?: () => void,
  className?: string
}

export default function StarRating({
  rating,
  hoverRating = 0,
  size = 'small',
  onStarClick = noop,
  onStarHover = noop,
  onMouseLeave = noop,
  className
}: StarRatingPropsType): JSX.Element {
  // Determine if instance is interactive.
  const isInteractive = onStarClick !== noop || onStarHover !== noop;

  // Limit rating to between 0 and MAX_NUM_STARS
  const clampedRating = clamp(rating, 0, MAX_NUM_STARS);

  // Round rating to PRECISION (e.g, 2.7 --> 2.5).
  const roundedRating = Math.round(clampedRating / PRECISION) * PRECISION;

  // Use hoverRating when present, otherwise use rating
  const ratingValue = hoverRating || roundedRating;

  // aria-label text
  const ariaStarText = ratingValue === 1 ? 'star' : 'stars';
  const ariaLabel = `${ratingValue} ${ariaStarText} out of ${MAX_NUM_STARS} star rating`;

  return (
    <div className={className}>
      <div
        className={classNames(styles.starRating, {
          [styles.small]: size === 'small',
          [styles.medium]: size === 'medium',
          [styles.large]: size === 'large',
        })}
        data-star={ratingValue}
        aria-label={ariaLabel}
        onMouseLeave={onMouseLeave}
        role={isInteractive ? undefined : 'img'}
      >
        {isInteractive && (
          <div className={styles.rateInputsWrap}>
            {times(MAX_NUM_STARS, index => (
              // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
              <label
                className={styles.rateLabel}
                key={index}
                onMouseEnter={(): void => onStarHover(index + 1)}
              >
                <input
                  className={styles.rateInput}
                  type="radio"
                  name="rating"
                  value={index + 1}
                  onClick={(): void => onStarClick(index + 1)}
                />
                {index === 0 ? '1 star' : `${index + 1} stars`}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
