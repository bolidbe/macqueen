import React, { useState } from 'react';
import { clamp, times, noop } from 'lodash';
import classNames from 'classnames';

import styles from './StarRating.module.scss';

// Total number of stars
const MAX_NUM_STARS = 5;

// Smallest increment we render
const PRECISION = 0.5;

interface StarRatingPropsType {
  rating: number | string;
  reviewsCount?: number;
  size?: 'small' | 'medium' | 'large';
  showRating?: boolean;
  className?: string;
  name?: string;
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StarRating({
  rating,
  reviewsCount,
  size = 'small',
  name,
  onChange = noop,
  showRating = false,
  className
}: StarRatingPropsType): JSX.Element {
  const [hoverRating, setHoverRating] = useState(0)

  // Determine if instance is interactive.
  const isInteractive = onChange !== noop;

  // Limit rating to between 0 and MAX_NUM_STARS
  // @ts-ignore
  const clampedRating = clamp(rating, 0, MAX_NUM_STARS);

  // Round rating to PRECISION (e.g, 2.7 --> 2.5).
  const roundedRating = Math.round(clampedRating / PRECISION) * PRECISION;

  // Use hoverRating when present, otherwise use rating
  const ratingValue = hoverRating || roundedRating;

  // aria-label text
  const ariaStarText = ratingValue === 1 ? 'star' : 'stars';
  const ariaLabel = `${ratingValue} ${ariaStarText} out of ${MAX_NUM_STARS} star rating`;

  return (
    <div className={classNames({
      [styles.starRatingContainer]: true,
      [styles.starRatingContainerSizeSmall]: size === 'small',
      [styles.starRatingContainerSizeMedium]: size === 'medium',
      [styles.starRatingContainerSizeLarge]: size === 'large',
    }, className)}>
      {showRating && (
        <div className={classNames({
          [styles.text]: true,
          [styles.textPositionLeft]: true
        })}>{ rating }</div>
      )}
      <div
        className={styles.starRating}
        data-star={ratingValue}
        aria-label={ariaLabel}
        onMouseLeave={() => setHoverRating(0)}
        role={isInteractive ? undefined : 'img'}
      >
        {isInteractive && (
          <div className={styles.inputWrap}>
            {times(MAX_NUM_STARS, (index: number) => (
              // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
              <label
                className={styles.label}
                key={index}
                onMouseEnter={(): void => setHoverRating(index + 1)}
              >
                <input
                  className={styles.input}
                  type="radio"
                  name={name}
                  value={index + 1}
                  onChange={(e): void => onChange(parseInt(e.target.value), e)}
                />
                {index === 0 ? '1 star' : `${index + 1} stars`}
              </label>
            ))}
          </div>
        )}
      </div>
      {reviewsCount && (
        <div className={classNames({
          [styles.text]: true,
          [styles.textPositionRight]: true
        })}>({ reviewsCount } Avis)</div>
      )}
    </div>
  );
}
