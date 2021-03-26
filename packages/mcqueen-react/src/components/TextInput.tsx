import React from 'react';

import TextInputBase, { TextInputBasePropsType } from "./subcomponents/TextInputBase"

export interface TextInputPropsType extends Omit<TextInputBasePropsType, "onChange"> {
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputPropsType>(
  (
    {
      onChange,
      ...props
    }: TextInputPropsType,
    outerRef,
  ): JSX.Element => {
    return (
      <TextInputBase
        {...props}
        ref={outerRef}
        onChange={(e): void => onChange(e.target.value, e)}
      />
    );
  },
);
TextInput.displayName = 'TextInput';

export default TextInput;
