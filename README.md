# Slate find and replace example

![unit test badge](https://github.com/corticoai/slate-find-replace/actions/workflows/main.yml/badge.svg)

Example of a find and replace feature for [SlateJS](https://github.com/ianstormtaylor/slate)

## Demo

https://corticoai.github.io/slate-find-replace/

## Features

- Highlights words that match the search param
- Highlights a 'focused' word which is the one that will be replaced if a replace is called
- Go to the next/previous word
- Determine next and previous based on editor selection
- Show number of matches?
- Replace one word
- Replace all instances of a word
- Case sensitive option

## Developing

### Installing

```
yarn
```

### Running

```
yarn start
```

### Testing

```
yarn test
```

### Deploying

Annoying right now, should automate eventually.

```
yarn build
```

Then git push your changes, including the `docs` folder.
