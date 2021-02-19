import React, { ReactNode, useState, useEffect } from "react"
import classNames from "classnames"
import { groupBy } from "lodash"

import TextInput from "./TextInput"

import styles from "./Autosuggest.module.scss"

export interface AutosuggestOptionType {
  label: string;
  value: any;
}

interface AutosuggestPropsType {
  value: string;
  options: AutosuggestOptionType[];
  onSelect(value: any): void;
  onChange(value: string): void;
  className?: string;
  iconLeft?: string;
  placeholder?: string;
  label?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  groupBy?: string;
}

export default function Autosuggest({
  value,
  onSelect,
  options,
  className,
  iconLeft,
  placeholder,
  onChange,
  label,
  isLoading=false,
  isDisabled=false,
  groupBy: group
}: AutosuggestPropsType) {
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  const handleSelect = (option: AutosuggestOptionType) => {
    onChange(option.label)
    onSelect(option.value)
  }

  const handleChange = (value: any) => {
    onChange(value)
  }

  const handleFocus = () => setOptionsIsOpen(true)
  const handleBlur = () => setOptionsIsOpen(false)
  const handleClickOutside = (event: any) => {
    if (optionsIsOpen && inputEl && !inputEl.contains(event.target)){
      handleBlur()
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  let optionsList: ReactNode;
  if(isLoading){
    optionsList = (
      <ul className={styles.options} onClick={handleBlur}>
        <li>Chargement des résultats...</li>
      </ul>
    )
  }else if(options.length > 0){
    if(group){
      const groups = groupBy(options, group)
      optionsList = Object.keys(groups).map((key: string, i: number) => (
        <div className={styles.group} key={i}>
          <div className={styles.groupName}>{ key }</div>
          <ul className={styles.options} onClick={handleBlur}>
          {groups[key].map((option: AutosuggestOptionType, j: number) => (
            <li className="hover:bg-blue-200 cursor-pointer" key={j} onClick={() => handleSelect(option)}>
              { option.label }
            </li>
          ))}
          </ul>
        </div>
      ))
    }else{
      optionsList = (
        <ul className={styles.options} onClick={handleBlur}>
        {options.map((option, i) => (
          <li className="hover:bg-blue-200 cursor-pointer" key={i} onClick={() => handleSelect(option)}>
            { option.label }
          </li>
        ))}
        </ul>
      )
    }
  }else if(value !== ""){
    optionsList = (
      <ul className={styles.options} onClick={handleBlur}>
        <li>Aucun résultat ne correspond à votre recherche</li>
      </ul>
    )
  }

  return (
    <div className={classNames("relative", className)}>
      <TextInput
        ref={setInputEl}
        onChange={handleChange}
        value={value}
        onFocus={handleFocus}
        className={classNames(styles.input, "w-full")}
        iconLeft={iconLeft}
        placeholder={placeholder}
        label={label}
        isDisabled={isDisabled}
      />
      {(optionsIsOpen && optionsList) && (
        <div className={styles.dropdown}>
        { optionsList }
        </div>
      )}
    </div>
  )
}
