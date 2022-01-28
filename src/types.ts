import { BaseRange } from "slate";

export interface SearchParams {
  q: string;
  caseSensitive: boolean;
}

export interface ReplaceParams {
  text: string;
  all: boolean;
}

interface Decorations {
  isSearchHighlight?: boolean;
  isFocusedSearchHighlight?: boolean;
}

export interface EditableParagraphText extends Decorations {
  text: string;
}

export interface EditableParagraph {
  type: "paragraph";
  children: EditableParagraphText[];
}

export type DecoratedRange = BaseRange & Decorations;
