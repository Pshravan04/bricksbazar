# Phase 13: Property Submission Wizard — QA & Verification

## Automated Verification
- **Build Status**: `pnpm run build` completed with exit code 0.
- **Routes Generated & Validated**:
  - `/dashboard/properties/create` (Prerendered static content, 148 B, 119 kB bundle)
  - `/post-property` (Prerendered static content, 148 B, 119 kB bundle)

## Manual Test Cases
1. **Linear Step Progression**:
   - Start at Step 1, select "Sell / Resale Property", click "Next Step".
   - Verify step 2 renders correctly.
   - Click "Back" and verify return to step 1 with selection preserved.
2. **Field Validation**:
   - Navigate to Step 4 (Location) and attempt to proceed with an empty city or pincode.
   - Verify red error highlight and toast message: "Please resolve the highlighted fields before continuing".
   - Enter valid 6-digit PIN code and proceed.
3. **Draft Persistence**:
   - Modify property title in Step 12.
   - Click "Save Draft".
   - Refresh the page and verify all modified fields remain intact.
   - Click "Reset" and verify confirmation that default values are restored.
4. **Photo Management**:
   - Add new photo URL with caption.
   - Click "Make Cover" and verify cover tag switches.
   - Click delete trash icon and verify photo removal.
5. **Submission Flow**:
   - Complete Step 14 review, toggle agreement checkbox, click "Submit Listing".
   - Verify submission modal opens showing unique generated listing ID (`BB-MUM-2026-XXXX`).
   - Click "Go to Agent Dashboard" and verify successful navigation.
