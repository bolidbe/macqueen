import React, { ReactNode, useState } from "react"
import classNames from "classnames"
import { Icon } from "@bolid/mcqueen-icons"
import Text from "./Text"

interface ReadMorePropsType {
  children: ReactNode;
  maxHeight?: number;
  className?: string;
  size?: 1 | 2 | 3 | 4;
}

export default function ReadMore({
  children,
  maxHeight = 230,
  size = 2,
  className
}: ReadMorePropsType){
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={classNames("relative", className)}>
      <div className="overflow-hidden" style={isExpanded ? {} : { maxHeight: maxHeight }}>
        { children }
      </div>
      <div className="cursor-pointer mt-3" onClick={() => setIsExpanded(!isExpanded)}>
        <Text size={size} className="flex items-center text-blue hover:text-blue-500">
          <span>
          { isExpanded ? "Voir moins" : "Voir plus" }
          </span>
          <Icon name={ isExpanded ? "chevron-up" : "chevron-down" } className="ml-1"/>
        </Text>
      </div>
    </div>
  )
}
