declare module '@bolid/mcqueen-icons';
declare module 'html-react-parser';
declare module 'intersection-observer';
declare module 'no-scroll';
declare module 'object-fit-images';
declare module 'query-string';
declare module 'react-popper';

// A SCSS module returns a map from string => string when imported.
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
