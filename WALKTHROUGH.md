# Walkthrough - Add Missing JSON-LD

## Changes

### 1. `pages/projects.tsx`
#### [MODIFY] [pages/projects.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/projects.tsx)
- **Added `CollectionPage` Schema**: Added structured data listing your key projects (Master Tour, EVA, Ryder, EVE, Byte, etc.) as `SoftwareApplication` entities. This helps Google understand that this page is a portfolio of software/tech projects.

### 2. `pages/index.tsx` (Splash Page)
#### [MODIFY] [pages/index.tsx](file:///Users/chrisbergstrom/WEBSITE/pages/index.tsx)
- **Added `Organization` & `WebSite` Schema**: Added structured data to the root domain to explicitly identify "CLB Consulting" as the organization and website owner. This is crucial for Knowledge Graph panels.

## Verification Results

### Automated Tests
- **Build Verification**: Ran `npm run build` successfully.
    - Result: `Exit code: 0`

### Manual Verification
- **Code Check**: Verified that valid JSON-LD scripts were added to the `<Head>` of both files.
