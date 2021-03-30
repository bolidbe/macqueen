import React from 'react';
import classNames from 'classnames';

import styles from './StarRating.module.scss';

import StarRatingBase, { StarRatingBasePropsType } from "./subcomponents/StarRatingBase"

interface StarRatingPropsType extends StarRatingBasePropsType {
  showRating?: boolean;
  reviewsCount?: number;
}

export default function StarRating({
  reviewsCount,
  size = 'small',
  showRating = false,
  className,
  rating,
  ...props
}: StarRatingPropsType): JSX.Element {
  return (
    <div className={classNames("flex items-center", className)}>
      {showRating && (
        <div className={classNames({
          [styles.textPositionLeft]: true,
          [styles.textSizeSmall]: size === 'small',
          [styles.textSizeMedium]: size === 'medium',
          [styles.textSizeLarge]: size === 'large',

        })}>{ rating }</div>
      )}
      <StarRatingBase
        size={size}
        rating={rating}
        {...props}
      />
      {reviewsCount && (
        <div className={classNames({
          [styles.textPositionRight]: true,
          [styles.textSizeSmall]: size === 'small',
          [styles.textSizeMedium]: size === 'medium',
          [styles.textSizeLarge]: size === 'large',
        })}>({ reviewsCount } Avis)</div>
      )}
    </div>
  );
}
