import React, { ReactNode, useState } from "react"
import classNames from "classnames"
import Autosuggest from 'react-autosuggest';

// import TextInput from "./TextInput"

type SuggestionValueType = string | number

export interface SuggestionType {
  label: string;
  value: SuggestionValueType;
  item?: any;
}

export interface SuggestionsSectionType {
  title: string;
  suggestions: SuggestionType[];
}

interface HandleChangeType {
  newValue: string;
  method: 'down' | 'up' | 'escape' | 'enter' | 'click' | 'type';
}

interface HandleFetchRequestedType {
  value: string;
  reason: 'input-changed' | 'input-focused' | 'escape-pressed' | 'suggestions-revealed' | 'suggestion-selected';
}

interface HandleSelectType {
  suggestion: SuggestionType;
  suggestionValue: SuggestionValueType;
  suggestionIndex: number;
  sectionIndex: number;
  method: 'click' | 'enter';
}

interface AutocompletePropsType {
  id?: string,
  isDisabled?: boolean,
  isReadOnly?: boolean,
  isRequired?: boolean,
  hasError?: boolean,
  placeholder?: string,
  size?: 'small' | 'large',
  name?: string,
  iconLeft?: string,
  className?: string,
  label?: ReactNode,
  note?: ReactNode,

  suggestions: SuggestionsSectionType[] | SuggestionType[];
  onFetchRequested(value: string): void;
  onSelect: (value: SuggestionValueType, suggestion: SuggestionType, event?: React.ChangeEvent<HTMLInputElement>) => void,
  onClearRequested?(): void;
  renderSuggestion?(suggestion: SuggestionType): ReactNode;
  shouldAlwaysRenderSuggestions?: boolean;
}

export default function Autocomplete({
  suggestions,
  onFetchRequested,
  onClearRequested = () => {},
  renderSuggestion = (suggestion: SuggestionType) => (
    <div>{ suggestion.label }</div>
  ),
  onSelect,
  shouldAlwaysRenderSuggestions = false,
  id,
  label,
  placeholder,
  className
}: AutocompletePropsType) {
  const [search, setSearch] = useState("")
  const [value, setValue] = useState<SuggestionValueType>("")

  const shouldRenderSuggestions = (value: string, _: string) => {
    return shouldAlwaysRenderSuggestions ? true : value.trim().length > 0;
  }

  const handleChange = (_: any, { newValue }: HandleChangeType) => {
    setSearch(newValue)
  }

  const handleFetchRequested = (value: HandleFetchRequestedType) => {
    onFetchRequested(value.value)
  }

  const handleSelectSuggestion = (_: any, { suggestion }: HandleSelectType) => {
    setValue(suggestion.value)
    onSelect(suggestion.value, suggestion)
  }

  return (
    <div className={classNames("relative", className)}>
      <input
        id={id}
        type="hidden"
        name={name}
        value={value}
      />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleFetchRequested}
        onSuggestionsClearRequested={onClearRequested}
        getSuggestionValue={(suggestion: SuggestionType) => suggestion.label}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={shouldRenderSuggestions}
        onSuggestionSelected={handleSelectSuggestion}
        inputProps={{
          value: search,
          onChange: handleChange,
          label,
          placeholder,
          // iconLeft
        }}
        // renderInputComponent={(inputProps: any) => <TextInput {...inputProps}/>}
      />
    </div>
  )
}
