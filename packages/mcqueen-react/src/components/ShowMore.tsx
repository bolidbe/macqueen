import React, { ReactNode } from "react"
import Text from "./Text"
import { ChevronUpIcon, ChevronDownIcon } from "@bolid/mcqueen-icons/dist/es"

type IconSize = 'tiny' | 'small' | 'medium'

export interface ShowMorePropsType {
  children: ReactNode;
  isExpanded: boolean;
  isShrinkable?: boolean;
  className?: string;
  size?: 1 | 2 | 3 | 4;
  chevronIsHidden?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

const iconSizes: IconSize[]  = ["medium", "small", "tiny", "tiny"]

export default function ShowMore({
  children,
  onClick,
  isExpanded,
  className,
  size = 2,
  isShrinkable = true,
  chevronIsHidden = false,
  style
}: ShowMorePropsType){
  const iconSize = iconSizes[size - 1]
  return (
    <div className={className} style={style}>
      { children }
      {(!isExpanded || isShrinkable) && (
        <div className="cursor-pointer" onClick={onClick}>
          <Text size={size} className="flex items-center text-blue hover:text-blue-500">
            <span>
            { isExpanded ? "Voir moins" : "Voir plus" }
            </span>
            {!chevronIsHidden && (
              <>
              {isExpanded ? (
                <ChevronUpIcon size={iconSize} className="ml-1"/>
              ) : (
                <ChevronDownIcon size={iconSize} className="ml-1"/>
              )}
              </>
            )}
          </Text>
        </div>
      )}
    </div>
  )
}
