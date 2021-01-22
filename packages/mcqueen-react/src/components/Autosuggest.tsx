import React, { ReactNode, useState, useEffect } from "react"
import classNames from "classnames"

import TextInput from "./TextInput"

import styles from "./Autosuggest.module.scss"

export interface OptionType {
  label: string;
  value: any;
}

interface AutosuggestPropsType {
  onSelect(value: any): void;
  options: OptionType[];
  onChange?(value: string): void;
  className?: string;
  iconLeft?: string;
  placeholder?: string;
  label?: string;
  isLoading?: boolean;
}

export default function Autosuggest({
  onSelect,
  className,
  iconLeft,
  placeholder,
  options,
  onChange,
  isLoading,
  label
}: AutosuggestPropsType) {
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("")
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  const handleSelect = (option: OptionType) => {
    setSearch(option.label)
    onSelect(option.value)
  }

  const handleChange = (value: any) => {
    setSearch(value)
    if(onChange) onChange(value)
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
    optionsList = <li>Chargement des résultats...</li>
  }else if(options.length > 0){
    optionsList = options.map((option, i) => (
      <li className="hover:bg-blue-200 cursor-pointer" key={i} onClick={() => handleSelect(option)}>
        { option.label }
      </li>
    ))
  }else if(search !== ""){
    optionsList = <li>Aucun résultat ne correspond à votre recherche</li>
  }

  return (
    <div className={classNames("relative", className)}>
      <TextInput
        ref={setInputEl}
        onChange={handleChange}
        value={search}
        onFocus={handleFocus}
        className={classNames(styles.input, "w-full")}
        iconLeft={iconLeft}
        placeholder={placeholder}
        label={label}
      />
      {(optionsIsOpen && optionsList) && (
        <ul className={styles.options} onClick={handleBlur}>
         { optionsList }
        </ul>
      )}
    </div>
  )
}
