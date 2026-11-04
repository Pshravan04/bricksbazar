# Phase 11: Authentication — Implementation Details

## Architecture Overview
The authentication module provides secure, accessible, client-validated interfaces:
- `src/lib/auth.ts`: Provides preset user profiles across all roles and maps roles to dashboard targets.
- `src/app/login/page.tsx`: Role-aware login with instant demo sign-in shortcuts.
- `src/app/register/page.tsx`: Multi-role onboarding with validation on 10-digit Indian mobile numbers.
- `src/app/verify-otp/page.tsx`: 6-digit verification with auto-focus advance and timer.
- `src/app/forgot-password/page.tsx`: Password recovery interface.
