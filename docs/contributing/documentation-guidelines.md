
# Documentation Guidelines

Almost all of the pages in this documentation are written in markdown and conform to the [rules of markdownlint](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md). You can easily make edits to existing pages by clicking the Pencil icon to the right of the page's header.

If you contribute to the documentation, make sure that your edits pass linting which will automatically occur once you submit you changes.

When creating documentation, please try to do the following:

- Follow logical groupings for sections and pages. E.g. - All documentation for How-tos is under `docs/how-tos/`
- Place images in the `docs/img/` following the same logical groupings as above. E.g. - All images for How-tos are under `docs/img/how-tos`

If you run into any linting issues, you may find a full list of linting rules, and examples, in the [markdownlint repository](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md)

Highlights:

- Heading levels should only increment by one level at a time.
- No hard tabs. All indentation should use spaces and be consistent.
- There should be no more than 1 blank line between text or elements.
- Unordered lists elements should start with `-`.
- Ordered list should all start with `1.` regardless of the order. Markdown will handle the proper numbering sequence when rendering.
- Headings, lists, and code blocks (possibly more) should be surrounded by blank lines.
- Images should have alternate text (alt text).
- Files should end with a blank line.

Disabled rules:

- Line length
- No Inline HTML
- First line in file should be a top level heading
