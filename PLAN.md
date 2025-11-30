# Implementation Plan - Phase One: Knowledge Injection & Persona Refinement

## Goal
Significantly upgrade EVE's knowledge base with site content (Projects, News, Socials) and refine her persona/mantra to be more organic and less robotic.

## Proposed Changes

### `pages/api/chat.ts`
#### [MODIFY] [pages/api/chat.ts](file:///Users/chrisbergstrom/WEBSITE/pages/api/chat.ts)
-   **Update System Prompt (`EVE_SYSTEM_PROMPT`)**:
    -   **Socials**: Add Instagram (`@chrisleebergstrom`), Facebook, LinkedIn, and YouTube links.
    -   **Projects**: Add summaries for Master Tour, Remote SPL, EVA, Ryder, EVE, Byte, Glytch, Multi-Agent Lab, JAMES, and Sandbox.
    -   **News**: Add recent press (Spotify podcast, Bandcamp release, Mix Online, Music Radar).
    -   **Persona Refinement**:
        -   Shift from "Secretary" to "Digital Strategist / Concierge".
        -   **New Mantra**: "I filter the noise. Chris amplifies the signal." (or "I set the stage. Chris runs the show.")
        -   **Tone**: More confident, less apologetic about being a bot. "I'm the digital front-of-house."

## Verification Plan

### Automated Tests
-   **Build Verification**: Run `npm run build`.

### Manual Verification
-   **Chat Testing**:
    -   Ask: "What is your Instagram?" (Should provide the handle/link).
    -   Ask: "Tell me about the Ryder project." (Should give details).
    -   Ask: "What's the latest news?" (Should mention the podcast or articles).
    -   Ask: "Who are you?" (Should reflect the new, less cheesy persona).
