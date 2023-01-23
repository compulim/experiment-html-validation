## Quirks

- `aria-errormessage` is not narrated
- `aria-invalid="true"` is narrated
   - Type a number, abc, invalid, abc selected
- For submit button, `input[type="submit"]`, `aria-invalid` is not narrated
- `required` attributes and other constraints does not applies to `<input type="hidden">`
   - `onsubmit` does not verify
   - `checkValidity` does not return `false` (constraint failure)
