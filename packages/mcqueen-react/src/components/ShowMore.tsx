import React, { ReactNode } from "react"
import Text from "./Text"
import { Icon } from "@bolid/mcqueen-icons"

type IconSize = 'tiny' | 'small' | 'medium'

interface ShowMorePropsType {
  children: ReactNode;
  isExpanded: boolean;
  isShrinkable?: boolean;
  className?: string;
  size?: 1 | 2 | 3 | 4;
  hideChevron?: boolean;
  onClick(): void;
}

const iconSizes: IconSize[]  = ["medium", "small", "tiny", "tiny"]

export default function ShowMore({
  children,
  onClick,
  isExpanded,
  className,
  size = 2,
  isShrinkable = true,
  hideChevron = false
}: ShowMorePropsType){
  const iconSize = iconSizes[size - 1]
  return (
    <div className={className}>
      { children }
      {(!isExpanded || isShrinkable) && (
        <div className="cursor-pointer" onClick={onClick}>
          <Text size={size} className="flex items-center text-blue hover:text-blue-500">
            <span>
            { isExpanded ? "Voir moins" : "Voir plus" }
            </span>
            {!hideChevron && (
              <Icon size={iconSize} name={ isExpanded ? "chevron-up" : "chevron-down" } className="ml-1"/>
            )}
          </Text>
        </div>
      )}
    </div>
  )
}
