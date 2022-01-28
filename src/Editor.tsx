import { createEditor, Descendant, NodeEntry, Node } from "slate";
import React from "react";
import { withHistory } from "slate-history";
import {
  Slate,
  withReact,
  Editable,
  RenderElementProps,
  RenderLeafProps
} from "slate-react";
import { DecoratedRange, ReplaceParams, SearchParams } from "./types";

import FindAndReplace from "./FindAndReplace";
import {
  getAllSearchRanges,
  getNextSearchMatchStep,
  getSearchRanges,
  replaceOne,
  replaceAll
} from "./utils/slate-find-replace";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text:
          "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since."
      }
    ]
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "“Whenever you feel like criticizing anyone,” he told me, “just remember that all the people in this world haven’t had the advantages that you’ve had.”"
      }
    ]
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "He didn’t say any more, but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I’m inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgements is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth."
      }
    ]
  }
];

const Editor = () => {
  const editor = React.useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );
  const [value, setValue] = React.useState<Descendant[]>(initialValue);
  const [searchParams, setSearchParams] = React.useState<SearchParams>({
    q: "",
    caseSensitive: false
  });
  const [searchMatchedRanges, setSearchMatchedRanges] = React.useState<
    DecoratedRange[]
  >([]);
  const [searchStep, setSearchStep] = React.useState(0);

  const handleChange = (v: Descendant[]) => {
    const { operations } = editor;
    const firstOperation = operations[0];
    if (
      firstOperation &&
      (firstOperation.type === "insert_text" ||
        firstOperation.type === "remove_text")
    ) {
      const ranges = getAllSearchRanges(editor, searchParams);
      setSearchMatchedRanges(ranges);
    }
    setValue(v);
  };
  const searchRef = React.useRef<HTMLSpanElement>(null);

  const handleSearchNext = () => {
    if (searchStep >= searchMatchedRanges.length - 1) {
      setSearchStep(0);
    } else {
      setSearchStep(searchStep + 1);
    }
  };
  const handleSearchPrevious = () => {
    if (searchStep === 0) {
      setSearchStep(searchMatchedRanges.length - 1);
    } else {
      setSearchStep(searchStep - 1);
    }
  };

  React.useEffect(() => {
    const ranges = getAllSearchRanges(editor, searchParams);
    setSearchMatchedRanges(ranges);

    const step = getNextSearchMatchStep(editor, ranges);
    setSearchStep(step);
  }, [searchParams, editor]);

  const renderElement = React.useCallback((props: RenderElementProps) => {
    return <p {...props}></p>;
  }, []);

  const focusedSearch = searchMatchedRanges[searchStep];

  const handleReplace = (r: ReplaceParams) => {
    if (r.all) {
      replaceAll(editor, r.text, searchMatchedRanges);
    } else {
      replaceOne(editor, r.text, focusedSearch);
    }
  };

  const renderLeaf = React.useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      let color = "transparent";
      if (leaf.isFocusedSearchHighlight) {
        color = "peachpuff";
      } else if (leaf.isSearchHighlight) {
        color = "cornsilk";
      }
      return (
        <span
          {...attributes}
          {...(leaf.isFocusedSearchHighlight && {
            "data-testid": "search-focused"
          })}
          style={{
            backgroundColor: color
          }}
        >
          {children}
        </span>
      );
    },
    []
  );

  const decorate = React.useCallback(
    ([node, path]: NodeEntry<Node>) => {
      return getSearchRanges(node, path, searchParams, focusedSearch);
    },
    [focusedSearch, searchParams]
  );

  return (
    <div>
      <FindAndReplace
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearchNext={handleSearchNext}
        onSearchPrevious={handleSearchPrevious}
        onReplace={handleReplace}
        searchIndex={searchStep}
        totalSearchResults={searchMatchedRanges.length}
      />
      <Slate editor={editor} value={value} onChange={handleChange}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          decorate={decorate}
        />
      </Slate>
    </div>
  );
};

export default Editor;
