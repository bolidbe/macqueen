declare module 'intersection-observer';
declare module 'object-fit-images';

// A SCSS module returns a map from string => string when imported.
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
