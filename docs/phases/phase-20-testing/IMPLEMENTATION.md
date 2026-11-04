# Phase 20: Testing & Quality Assurance — Implementation Details

## Test Runner Architecture
The test infrastructure leverages Node.js v24 native test runner (`node:test`) and strict assertion module (`node:assert/strict`), avoiding heavy third-party test framework overheads while executing TypeScript test specs via Node's native type stripping.

## Test Scripts
- `package.json`:
  ```json
  "scripts": {
    "test": "node --test tests/unit/*.test.ts tests/integration/*.test.ts"
  }
  ```

## Coverage Summary
- **18 Total Unit & Integration Tests**:
  - 4 formatter & calculation tests
  - 4 Indian regulatory validation tests
  - 5 property filter & sort logic tests
  - 5 integration service adapter tests
- **Execution Time**: ~127 ms total duration.
