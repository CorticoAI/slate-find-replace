import { Editor, Path, Text, Node, Transforms } from "slate";

import { DecoratedRange, SearchParams } from "../types";

export const MIN_SEARCH_WORD_LENGTH = 0;
/**
 * Return a list of ranges for which a search parameter exists in a node
 * @param node
 * @param path
 * @param searchParams
 * @param focusedRange If given, will tack on an extra property to the DecoratedRange to
 * show that this range in particular is in focus
 */
export const getSearchRanges = (
  node: Node,
  path: Path,
  searchParams: SearchParams,
  focusedRange?: DecoratedRange
) => {
  const ranges: DecoratedRange[] = [];
  const { q, caseSensitive } = searchParams;
  // only do a search if it is above the minimum number of characters
  if (!Text.isText(node) || q.length <= MIN_SEARCH_WORD_LENGTH) {
    return ranges;
  }

  let { text } = node;

  // handle casing
  let search = q;
  if (!caseSensitive) {
    text = text.toLowerCase();
    search = q.toLowerCase();
  }

  const parts: string[] = text.split(search);

  let offset = 0;
  parts.forEach((part, index) => {
    if (index !== 0) {
      // check if this range is the focused one
      const isFocusedSearchHighlight =
        focusedRange &&
        Path.equals(focusedRange.anchor.path, path) &&
        focusedRange.focus.offset === offset;
      ranges.push({
        anchor: { path, offset: offset - search.length },
        focus: { path, offset },
        isSearchHighlight: true,
        isFocusedSearchHighlight: !!isFocusedSearchHighlight
      });
    }

    offset = offset + part.length + search.length;
  });

  return ranges;
};

export const getAllSearchRanges = (
  editor: Editor,
  searchParams: SearchParams
) => {
  if (
    !editor.children.length ||
    searchParams.q.length <= MIN_SEARCH_WORD_LENGTH
  ) {
    return [];
  }

  const matchingNodes = Editor.nodes(editor, {
    at: [],
    match: (node) => Text.isText(node) && node.text.includes(searchParams.q)
  });
  let nodeMatch = matchingNodes.next();
  let ranges: DecoratedRange[] = [];
  while (!nodeMatch.done) {
    const [node, path] = nodeMatch.value;
    ranges.push(...getSearchRanges(node, path, searchParams));
    nodeMatch = matchingNodes.next();
  }
  return ranges;
};

export const replaceOne = (
  editor: Editor,
  text: string,
  focusedSearch: DecoratedRange
) => {
  Transforms.insertText(editor, text, {
    at: {
      anchor: focusedSearch.anchor,
      focus: focusedSearch.focus
    }
  });
};

export const replaceAll = (
  editor: Editor,
  text: string,
  matchedRanges: DecoratedRange[]
) => {
  if (!matchedRanges.length) {
    return;
  }
  // we run into a problem when the text we are replacing is not the same length
  // as the text we are replacing it with. we can't just use the ranges we calculated
  // before because of this. This affects when there's multiple matches within a node,
  // so we can keep track of the node matches and calculate the offset diff we need to do
  const originalWordLength = Math.abs(
    matchedRanges[0].anchor.offset - matchedRanges[0].focus.offset
  );
  let sameNodeAdjustment = 0;
  let prevNodePath: Path | undefined;
  matchedRanges.forEach((range) => {
    const currentPath = range.anchor.path;
    if (prevNodePath && Path.equals(currentPath, prevNodePath)) {
      // this is not the first instance where we replaced text. we need to calculate
      // how much our offsets are off by
      sameNodeAdjustment =
        sameNodeAdjustment + (text.length - originalWordLength);
    } else {
      sameNodeAdjustment = 0;
    }
    Transforms.insertText(editor, text, {
      at: {
        anchor: {
          ...range.anchor,
          offset: range.anchor.offset + sameNodeAdjustment
        },
        focus: {
          ...range.focus,
          offset: range.focus.offset + sameNodeAdjustment
        }
      }
    });

    prevNodePath = range.anchor.path;
  });
};

/**
 * Get the next search match based on where the user's selection currently is.
 * We want to get the *next* match after the cursor, so that if the user is looking
 * at the middle of the doc, they aren't brought up to the first match, but rather the
 * next match. Returns a step number
 * @param editor
 * @param ranges
 */
export const getNextSearchMatchStep = (
  editor: Editor,
  ranges: DecoratedRange[]
) => {
  // with the ranges, we should set our step accordingly, based on the editor selection
  let step = 0;
  if (editor.selection) {
    const { anchor: selectionAnchor } = editor.selection;
    // we want to find the first range that is after the current selection
    // use .some + return True to mimic 'break' behavior
    const found = ranges.some((r) => {
      // returns -1, 0, or 1 for before, at, or after
      const pathCompare = Path.compare(r.anchor.path, selectionAnchor.path);
      // this match is above the selection
      if (pathCompare === -1) {
        ++step;
        // this match is in the same node as the selection
      } else if (pathCompare === 0) {
        // this match is before the selection
        if (r.anchor.offset <= selectionAnchor.offset) {
          ++step;
          // this match is after the selection, we found the next one
        } else {
          return true;
        }
      }
      // this match is in a node after the selection, we found the next one
      else {
        return true;
      }
      return false;
    });
    // we never found a match, could be selection is after ALL matches, so instead set to the first one
    // could also consider setting to the last one?
    if (!found) {
      step = 0;
    }
  }
  return step;
};
