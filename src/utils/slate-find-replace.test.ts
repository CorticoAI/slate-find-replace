import { createEditor, Descendant, Transforms } from "slate";
import {
  getAllSearchRanges,
  getNextSearchMatchStep,
  getSearchRanges,
  replaceAll,
} from "./slate-find-replace";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "the cats are loose! the cats are loose!",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "someone please ask the cats to stop fooling around",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "at least the dogs are behaving",
      },
    ],
  },
];

const mockEditor = () => {
  const editor = createEditor();
  editor.children = initialValue;
  return editor;
};

describe("getSearchRanges", () => {
  it("can return a range for a word in a node", () => {
    const node = { text: "Hi everyone, let me tell you about cats." };
    const path = [0, 0];
    const searchParams = { q: "cats", isSearching: true, caseSensitive: false };
    const ranges = getSearchRanges(node, path, searchParams);
    expect(ranges.length).toEqual(1);
    expect(ranges[0]).toEqual({
      anchor: { offset: 35, path: [0, 0] },
      focus: { offset: 39, path: [0, 0] },
      isFocusedSearchHighlight: false,
      isSearchHighlight: true,
    });
  });
  it("can return multiple words in a node and can respect casing", () => {
    const node = {
      text: "The cats avoided a catsastrophe while watching Cats the musical!",
    };
    const path = [0, 0];
    const searchParams = { q: "cats", isSearching: true, caseSensitive: false };
    const ranges = getSearchRanges(node, path, searchParams);
    expect(ranges.length).toEqual(3);
    const rangesWithCasing = getSearchRanges(node, path, {
      ...searchParams,
      caseSensitive: true,
    });
    expect(rangesWithCasing.length).toEqual(2);
  });
  it("can return a focused search", () => {
    const node = {
      text: "The cats avoided a catsastrophe while watching Cats the musical!",
    };
    const path = [0, 0];
    const searchParams = { q: "cats", isSearching: true, caseSensitive: false };
    const ranges = getSearchRanges(node, path, searchParams);
    const focused = ranges[0];

    const rangesWithFocused = getSearchRanges(
      node,
      path,
      searchParams,
      focused
    );
    expect(rangesWithFocused.length).toEqual(3);
    expect(rangesWithFocused[0]).toEqual({
      anchor: { offset: 4, path: [0, 0] },
      focus: { offset: 8, path: [0, 0] },
      isFocusedSearchHighlight: true,
      isSearchHighlight: true,
    });
  });

  describe("getAllSearchRanges", () => {
    it("can return a range for a word in a node", () => {
      const editor = mockEditor();
      const ranges = getAllSearchRanges(editor, {
        q: "cats",
        caseSensitive: false,
      });
      // 2 in the first node, 1 in the second, none in the third
      expect(ranges.length).toEqual(3);
      expect(ranges).toEqual([
        {
          anchor: { offset: 4, path: [0, 0] },
          focus: { offset: 8, path: [0, 0] },
          isFocusedSearchHighlight: false,
          isSearchHighlight: true,
        },
        {
          anchor: { offset: 24, path: [0, 0] },
          focus: { offset: 28, path: [0, 0] },
          isFocusedSearchHighlight: false,
          isSearchHighlight: true,
        },
        {
          anchor: { offset: 23, path: [1, 0] },
          focus: { offset: 27, path: [1, 0] },
          isFocusedSearchHighlight: false,
          isSearchHighlight: true,
        },
      ]);
    });
  });
  describe("replaceAll", () => {
    it("can replace all instances of text", () => {
      const editor = mockEditor();
      const search = {
        q: "cats",
        isSearching: true,
        caseSensitive: false,
      };
      const ranges = getAllSearchRanges(editor, search);
      expect(ranges.length).toEqual(3);
      replaceAll(editor, "dogs", ranges);
      expect(getAllSearchRanges(editor, search).length).toEqual(0);
      // @ts-ignore because Descendant doesn't seem to get its type properly here
      const allText = editor.children.map((child) => child.children[0].text);
      expect(allText).toEqual([
        "the dogs are loose! the dogs are loose!",
        "someone please ask the dogs to stop fooling around",
        "at least the dogs are behaving",
      ]);
    });
  });
  describe("searchNextStep", () => {
    it("can get the search step if there is no selection", () => {
      const editor = mockEditor();
      const search = {
        q: "cats",
        isSearching: true,
        caseSensitive: false,
      };
      const ranges = getAllSearchRanges(editor, search);
      expect(ranges.length).toEqual(3);

      const step = getNextSearchMatchStep(editor, ranges);
      expect(step).toEqual(0);
    });
    it("can get the search step if there is a selection at the beginning", () => {
      const editor = mockEditor();
      const search = {
        q: "cats",
        isSearching: true,
        caseSensitive: false,
      };
      const ranges = getAllSearchRanges(editor, search);
      expect(ranges.length).toEqual(3);

      // set to the first letter
      Transforms.select(editor, {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      });

      const step = getNextSearchMatchStep(editor, ranges);
      expect(step).toEqual(0);
    });

    it("can get the search step if there is a selection between two instances in a node", () => {
      const editor = mockEditor();
      const search = {
        q: "cats",
        isSearching: true,
        caseSensitive: false,
      };
      const ranges = getAllSearchRanges(editor, search);
      expect(ranges.length).toEqual(3);

      // set to the middle of the first snippet, between the two 'cats'
      Transforms.select(editor, {
        anchor: { path: [0, 0], offset: 15 },
        focus: { path: [0, 0], offset: 15 },
      });

      const step = getNextSearchMatchStep(editor, ranges);
      expect(step).toEqual(1);
    });

    it("can get the search step if there is a selection at the end of a node", () => {
      const editor = mockEditor();
      const search = {
        q: "cats",
        isSearching: true,
        caseSensitive: false,
      };
      const ranges = getAllSearchRanges(editor, search);
      expect(ranges.length).toEqual(3);

      // set to the end of the first snippet, after the two 'cats'
      Transforms.select(editor, {
        anchor: { path: [0, 0], offset: 32 },
        focus: { path: [0, 0], offset: 32 },
      });

      const step = getNextSearchMatchStep(editor, ranges);
      expect(step).toEqual(2);
    });

    it("can get the search step if the selection is at the very end", () => {
      const editor = mockEditor();
      const search = {
        q: "cats",
        isSearching: true,
        caseSensitive: false,
      };
      const ranges = getAllSearchRanges(editor, search);
      expect(ranges.length).toEqual(3);

      // set to the end of the end of the doc snippet, after all 'cats'
      Transforms.select(editor, {
        anchor: { path: [2, 0], offset: 10 },
        focus: { path: [2, 0], offset: 10 },
      });

      const step = getNextSearchMatchStep(editor, ranges);
      expect(step).toEqual(0);
    });
  });
});
