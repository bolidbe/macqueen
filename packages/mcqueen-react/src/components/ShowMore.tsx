import React, { ReactNode } from "react"
import Text from "./Text"
import { Icon } from "@bolid/mcqueen-icons"

interface ShowMorePropsType {
  children: ReactNode;
  isExpanded: boolean;
  className?: string;
  onClick?(): void;
}

export default function ShowMore({
  children,
  onClick,
  isExpanded,
  className
}: ShowMorePropsType){
  return (
    <div className={className}>
      { children }
      {
        onClick && (
          <div className="cursor-pointer mt-1" onClick={onClick}>
            <Text className="flex items-center text-blue hover:text-blue-500">
              <span>
              {
                isExpanded ? "Voir moins" : "Voir plus"
              }
              </span>
              <Icon name={ isExpanded ? "chevron-up" : "chevron-down" } className="ml-1"/>
            </Text>
          </div>
        )
      }
    </div>
  )
}
