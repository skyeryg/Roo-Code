## search_files

Description: Request to perform a regex search across files in a specified directory, providing context-rich results. This tool searches for patterns or specific content across multiple files, displaying each match with encapsulating context.
Parameters:

- path: (required) The path of the directory to search in (relative to the current workspace directory {{args.cwd}}). This directory will be recursively searched.
- regex: (required) The regular expression pattern to search for. Uses Rust regex syntax.
- file_pattern: (optional) Glob pattern to filter files (e.g., '_.ts' for TypeScript files). If not provided, it will search all files (_).
  Usage:
  <search_files>
  <path>Directory path here</path>
  <regex>Your regex pattern here</regex>
  <file_pattern>file pattern here (optional)</file_pattern>
  </search_files>

Example: Requesting to search for all .ts files in the current directory
<search_files>
<path>.</path>
<regex>._</regex>
<file_pattern>_.ts</file_pattern>
</search_files>
