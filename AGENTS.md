<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the five uploaded-reference CV layouts in the shared TemplateReferences renderer, with their distinct page treatments in src/styles.css; this centralizes repeated CV fields while retaining separate selectable designs.
- Render CV photos through the shared Photo helper in every template so shape, crop, and zoom settings work consistently in previews and exports.
