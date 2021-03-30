import React, { ReactNode, useState, useRef } from "react"
import Autosuggest from 'react-autosuggest';
import classNames from "classnames"
import { has, find, debounce, noop } from "lodash"

import TextInputBase, { TextInputBasePropsType } from "./subcomponents/TextInputBase"

import styles from "./Autocomplete.module.scss"

export interface AutocompleteSuggestionType {
  label: string;
  value: string;
  item?: any;
}

export interface AutocompleteSuggestionsSectionType {
  section: string;
  suggestions: AutocompleteSuggestionType[];
}

export interface AutocompleteThemeType {
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
  suggestionValue: string;
  suggestionIndex: number;
  sectionIndex: number;
  method: 'click' | 'enter';
}

export interface AutocompletePropsType extends Omit<TextInputBasePropsType, "onChange" | "value"> {
  defaultSuggestion?: AutocompleteSuggestionType;
  suggestions: AutocompleteSuggestionsSectionType[] | AutocompleteSuggestionType[];
  onFetchRequested: (value: string) => void;
  onClearRequested?: () => void;
  fetchDelay?: number;
  onSelect?: (value: string, suggestion: AutocompleteSuggestionType, event?: React.ChangeEvent<HTMLInputElement>) => void;
  renderSuggestion?: (suggestion: AutocompleteSuggestionType) => ReactNode;
  renderSuggestionsContainer?: (options: any) => ReactNode;
  renderSectionTitle?: (section: AutocompleteSuggestionsSectionType) => ReactNode;
  shouldAlwaysRenderSuggestions?: boolean;
  theme?: AutocompleteThemeType;
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

export default React.forwardRef<HTMLInputElement, AutocompletePropsType>(
  function Autocomplete(
    {
      id,
      name,
      className,
      defaultSuggestion,
      suggestions,
      onFetchRequested,
      fetchDelay = 0,
      onClearRequested = noop,
      renderSuggestion = defaultRenderSuggestion,
      renderSuggestionsContainer = defaultRenderSuggestionsContainer,
      renderSectionTitle = defaultRenderSectionTitle,
      onSelect = noop,
      shouldAlwaysRenderSuggestions = false,
      theme = {},
      ...props
    }: AutocompletePropsType,
    outerRef
  ): JSX.Element {
    const onFetchRequestedDebounce = useRef<any>(debounce((value: string): void => {
      if(value !== ""){
        onFetchRequested(value)
      }else{
        onClearRequested()
      }
    }, fetchDelay))

    const [search, setSearch] = useState(defaultSuggestion ? defaultSuggestion.label : "")
    const [value, setValue] = useState<string>(defaultSuggestion ? defaultSuggestion.value : "")

    const shouldRenderSuggestions = (value: string, _: string) => {
      return shouldAlwaysRenderSuggestions ? true : value.trim().length > 0;
    }

    const handleChange = (_: any, { newValue }: HandleChangeType) => {
      setSearch(newValue)
    }

    const handleFetchRequested = ({ value }: HandleFetchRequestedType) => {
      onFetchRequestedDebounce.current(value)
    }

    const handleSelectSuggestion = (_: any, { suggestion }: HandleSelectType) => {
      setValue(suggestion.value)
      onSelect(suggestion.value, suggestion)
    }

    // const valuePropObject = defaultSuggestion ? { value: defaultSuggestion.value } : {};

    return (
      <div className={classNames("relative", className)}>
        <input
          ref={outerRef}
          id={id}
          name={name}
          type="hidden"
          value={value}
        />
        <Autosuggest
          theme={{
            ...styles,
            theme
          }}
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleFetchRequested}
          onSuggestionsClearRequested={noop}
          renderSuggestionsContainer={renderSuggestionsContainer}
          renderSuggestion={renderSuggestion}
          getSuggestionValue={(suggestion: AutocompleteSuggestionType) => suggestion.label}
          renderSectionTitle={renderSectionTitle}
          getSectionSuggestions={defaultGetSectionSuggestions}
          shouldRenderSuggestions={shouldRenderSuggestions}
          onSuggestionSelected={handleSelectSuggestion}
          multiSection={!!find(suggestions, s => has(s, "section"))}
          inputProps={{
            ...props,
            value: search,
            onChange: handleChange,
            name: name ? `${name}-autocomplete` : "autocomplete"
          }}
          renderInputComponent={(inputProps: any) => <TextInputBase {...inputProps}/>}
        />
      </div>
    )
  }
)
