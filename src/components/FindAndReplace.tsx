import React from "react";
import { SearchParams, ReplaceParams } from "../types";
import { MIN_SEARCH_WORD_LENGTH } from "../utils/slate-find-replace";

interface Props {
  searchParams: SearchParams;
  setSearchParams: (s: SearchParams) => void;
  onSearchNext: () => void;
  onSearchPrevious: () => void;
  onReplace: (r: ReplaceParams) => void;
  searchIndex: number;
  totalSearchResults: number;
}
const FindAndReplace = ({
  searchParams,
  setSearchParams,
  onSearchNext,
  onSearchPrevious,
  onReplace,
  totalSearchResults,
  searchIndex,
}: Props) => {
  const [draftReplace, setDraftReplace] = React.useState("");

  const handleSearchChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, q: evt.currentTarget.value });
  };

  const handleReplaceChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    setDraftReplace(evt.currentTarget.value);
  };

  const onReplaceOne = () => {
    onReplace({ text: draftReplace, all: false });
  };
  const onReplaceAll = () => {
    onReplace({ text: draftReplace, all: true });
  };

  const toggleCaseSensitive = () => {
    setSearchParams({
      ...searchParams,
      caseSensitive: !searchParams.caseSensitive,
    });
  };

  return (
    <div style={{ border: "1px solid cornflowerblue", padding: "8px" }}>
      <div style={{ marginBottom: "8px" }}>
        <input
          value={searchParams.q}
          onChange={handleSearchChange}
          style={{ marginRight: "4px" }}
        ></input>

        <button onClick={onSearchPrevious} style={{ marginRight: "4px" }}>
          Previous
        </button>

        <button onClick={onSearchNext} style={{ marginRight: "4px" }}>
          Next
        </button>

        {searchParams.q.length > MIN_SEARCH_WORD_LENGTH && (
          <span style={{ marginRight: "4px" }}>
            {totalSearchResults === 0 ? 0 : searchIndex + 1} of{" "}
            {totalSearchResults}
          </span>
        )}
      </div>
      <div>
        <input
          value={draftReplace}
          onChange={handleReplaceChange}
          style={{ marginRight: "4px" }}
        ></input>
        <button style={{ marginRight: "4px" }} onClick={onReplaceOne}>
          Replace
        </button>
        <button onClick={onReplaceAll}>Replace all</button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={searchParams.caseSensitive}
            onChange={toggleCaseSensitive}
          ></input>
          Case sensitive
        </label>
      </div>
    </div>
  );
};

export default FindAndReplace;
