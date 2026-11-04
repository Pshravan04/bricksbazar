# BRICKSBAZAR — Architectural Decisions Log

## ADR-001: Next.js App Router Monolith with Modular Architecture
- **Date**: 2026-11-03
- **Decision**: Adopt Next.js 14 App Router as a unified frontend and API platform, structured cleanly into `src/features`, `src/components`, `src/mocks`, and `server/` modules.
- **Rationale**: Avoids premature microservice complexity, ensures lightning-fast local development and SSR capabilities, while leaving a clean separation for scaling the Express/MongoDB backend.

## ADR-002: Official Brand Colors & Tokens
- **Date**: 2026-11-03
- **Decision**: Enforce Primary Red `#C6383B`, White `#FFFFFF`, and supporting neutrals (`#F8F8F8`, `#252525`, `#777777`, `#EAEAEA`).
- **Rationale**: Strictly preserves brand identity without distracting neon gradients or excessive saturated blocks, reflecting a premium editorial aesthetic.

## ADR-003: Stateful In-Memory Mock Architecture with Distinct Demo Badges
- **Date**: 2026-11-03
- **Decision**: Provide comprehensive realistic Indian demo records (Mumbai, Pune, Thane, Bengaluru, etc.) marked with `isDemoRecord: true` and functional filtering.
- **Rationale**: Complies with the prompt requirement to never claim mocked data is a real backend, while providing an active, realistic user experience with genuine filtering and responsive state.

