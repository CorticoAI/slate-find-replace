// Based on https://docs.slatejs.org/walkthroughs/01-installing-slate

import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

import { EditableParagraph, EditableParagraphText } from "./types";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export type CustomElement = EditableParagraph;
export type CustomText = EditableParagraphText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
