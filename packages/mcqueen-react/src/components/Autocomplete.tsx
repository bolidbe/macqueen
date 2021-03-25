import React, { ReactNode, useState, useRef, useEffect } from "react"
import Autosuggest from 'react-autosuggest';
import classNames from "classnames"
import { has, find, debounce } from "lodash"

import TextInputBase from "./subcomponents/TextInputBase"

import styles from "./Autocomplete.module.scss"

type SuggestionValueType = string | number

export interface AutocompleteSuggestionType {
  label: string;
  value: SuggestionValueType;
  item?: any;
}

export interface AutocompleteSuggestionsSectionType {
  section: string;
  suggestions: AutocompleteSuggestionType[];
}

interface AutocompleteTheme {
  container?: string;
  containerOpen?: string;
  input?: string;
  inputOpen?: string;
  inputFocused?: string;
  suggestionsContainer?: string;
  suggestionsContainerOpen?: string;
  suggestionsList?: string;
  suggestion?: string;
  suggestionFirst?: string;
  suggestionHighlighted?: string;
  sectionContainer?: string;
  sectionContainerFirst?: string;
  sectionTitle?: string;
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
  suggestion: AutocompleteSuggestionType;
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
  defaultSuggestion?: AutocompleteSuggestionType;
  suggestions: AutocompleteSuggestionsSectionType[] | AutocompleteSuggestionType[];
  onFetchRequested(value: string): void;
  fetchDelay?: number;
  onSelect: (value: SuggestionValueType, suggestion: AutocompleteSuggestionType, event?: React.ChangeEvent<HTMLInputElement>) => void,
  onClearRequested?(): void;
  renderSuggestion?(suggestion: AutocompleteSuggestionType): ReactNode;
  renderSuggestionsContainer?(options: any): ReactNode;
  renderSectionTitle?(section: AutocompleteSuggestionsSectionType): ReactNode;
  shouldAlwaysRenderSuggestions?: boolean;
  theme?: AutocompleteTheme;
}

const defaultRenderSuggestion = ({ label }: AutocompleteSuggestionType) => (
  <div>{ label }</div>
)

const defaultRenderSuggestionsContainer = ({ containerProps, children }: any): ReactNode => {
  return (
    <div {...containerProps}>
      { children }
    </div>
  );
}

const defaultRenderSectionTitle = (section: AutocompleteSuggestionsSectionType) => (
  <strong>{section.section}</strong>
)

const defaultGetSectionSuggestions = (section: AutocompleteSuggestionsSectionType) => {
  return section.suggestions;
}

export default function Autocomplete({
  id,
  isDisabled,
  isReadOnly,
  isRequired,
  hasError,
  placeholder,
  size,
  name,
  iconLeft,
  className,
  label,
  note,
  isLoading,
  defaultSuggestion,
  suggestions,
  onFetchRequested,
  fetchDelay = 0,
  onClearRequested = () => {},
  renderSuggestion = defaultRenderSuggestion,
  renderSuggestionsContainer = defaultRenderSuggestionsContainer,
  renderSectionTitle = defaultRenderSectionTitle,
  onSelect,
  shouldAlwaysRenderSuggestions = false,
  theme = {}
}: AutocompletePropsType) {
  const [search, setSearch] = useState(defaultSuggestion ? defaultSuggestion.label : "")
  const [value, setValue] = useState<SuggestionValueType>(defaultSuggestion ? defaultSuggestion.value : "")
  const onFetchRequestedDebounce = useRef<any>(undefined)

  useEffect(() => {
    onFetchRequestedDebounce.current = debounce((value: string): void => {
      onFetchRequested(value)
    }, fetchDelay)
  }, [])

  const shouldRenderSuggestions = (value: string, _: string) => {
    return shouldAlwaysRenderSuggestions ? true : value.trim().length > 0;
  }

  const handleChange = (_: any, { newValue }: HandleChangeType) => {
    setSearch(newValue)
  }

  const handleFetchRequested = (value: HandleFetchRequestedType) => {
    onFetchRequestedDebounce.current(value.value)
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
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={(suggestion: AutocompleteSuggestionType) => suggestion.label}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={defaultGetSectionSuggestions}
        shouldRenderSuggestions={shouldRenderSuggestions}
        onSuggestionSelected={handleSelectSuggestion}
        multiSection={!!find(suggestions, s => has(s, "section"))}
        inputProps={{
          id,
          value: search,
          onChange: handleChange,
          name: name ? `${name}-autocomplete` : undefined,
          isDisabled,
          isReadOnly,
          isRequired,
          hasError,
          placeholder,
          size,
          iconLeft,
          className,
          label,
          note,
          isLoading
        }}
        renderInputComponent={(inputProps: any) => <TextInputBase {...inputProps}/>}
      />
    </div>
  )
}
