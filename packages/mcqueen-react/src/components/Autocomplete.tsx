import React, { ReactNode, useState } from "react"
import classNames from "classnames"
import Autosuggest from 'react-autosuggest';

// import TextInput from "./TextInput"

import styles from "./Autocomplete.module.scss"

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

interface AutocompleteTheme {
  container: string;
  containerOpen: string;
  input: string;
  inputOpen: string;
  inputFocused: string;
  suggestionsContainer: string;
  suggestionsContainerOpen: string;
  suggestionsList: string;
  suggestion: string;
  suggestionFirst: string;
  suggestionHighlighted: string;
  sectionContainer: string;
  sectionContainerFirst: string;
  sectionTitle: string;
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
  isLoading?: boolean;
  suggestions: SuggestionsSectionType[] | SuggestionType[];
  onFetchRequested(value: string): void;
  onSelect: (value: SuggestionValueType, suggestion: SuggestionType, event?: React.ChangeEvent<HTMLInputElement>) => void,
  onClearRequested?(): void;
  renderSuggestion?(suggestion: SuggestionType): ReactNode;
  renderSuggestionsContainer?(options: any): ReactNode;
  renderSectionTitle?(section: SuggestionsSectionType): ReactNode;
  shouldAlwaysRenderSuggestions?: boolean;
  theme?: AutocompleteTheme;
}

const defaultRenderSuggestion = ({ label }: SuggestionType) => (
  <div>{ label }</div>
)

const defaultRenderSuggestionsContainer = ({ containerProps, children }: any): ReactNode => {
  return (
    <div {...containerProps}>
      { children }
    </div>
  );
}

const defaultRenderSectionTitle = (section: SuggestionsSectionType) => (
  <strong>{section.title}</strong>
)

export default function Autocomplete({
  id,
  //isDisabled,
  //isReadOnly,
  //isRequired,
  //hasError,
  placeholder,
  //size,
  name,
  // iconLeft,
  className,
  label,
  //note,
  //isLoading,
  suggestions,
  onFetchRequested,
  onClearRequested = () => {},
  renderSuggestion = defaultRenderSuggestion,
  renderSuggestionsContainer = defaultRenderSuggestionsContainer,
  renderSectionTitle = defaultRenderSectionTitle,
  onSelect,
  shouldAlwaysRenderSuggestions = false,
  theme = {}
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
        theme={{
          ...styles,
          theme
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleFetchRequested}
        onSuggestionsClearRequested={onClearRequested}
        getSuggestionValue={(suggestion: SuggestionType) => suggestion.label}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSectionTitle={renderSectionTitle}
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
