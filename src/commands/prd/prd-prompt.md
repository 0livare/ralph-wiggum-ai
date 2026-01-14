# PRD Generator

Create detailed Product Requirements Documents that are clear, actionable, and suitable for autonomous AI implementation via the Ralph loop.

---

## The Job

1. Receive a feature description from the user
2. Ask 3-5 essential clarifying questions (with lettered options)
3. Generate a structured PRD based on answers
4. Save to `prd.json`
5. Create empty `progress.txt`

**Important:** Do NOT start implementing. Just create the PRD.

---

## Step 1: Clarifying Questions

Ask only critical questions where the initial prompt is ambiguous. Focus on:

- **Problem/Goal:** What problem does this solve?
- **Core Functionality:** What are the key actions?
- **Scope/Boundaries:** What should it NOT do?
- **Success Criteria:** How do we know it's done?

### Format Questions Like This:

```
1. What is the primary goal of this feature?
   A. Improve user onboarding experience
   B. Increase user retention
   C. Reduce support burden
   D. Other: [please specify]

2. Who is the target user?
   A. New users only
   B. Existing users only
   C. All users
   D. Admin users only

3. What is the scope?
   A. Minimal viable version
   B. Full-featured implementation
   C. Just the backend/API
   D. Just the UI
```

This lets users respond with "1A, 2C, 3B" for quick iteration.

---

## Step 2: Story Sizing (THE NUMBER ONE RULE)

**Each story must be completable in ONE context window (~10 min of AI work).**

Ralph spawns a fresh instance per iteration with no memory of previous work. If a story is too big, the AI runs out of context before finishing and produces broken code.

### Right-sized stories:

- Add a database column and migration
- Add a single UI component to an existing page
- Update a server action with new logic
- Add a filter dropdown to a list

### Too big (MUST split):

| Too Big               | Split Into                                         |
| --------------------- | -------------------------------------------------- |
| "Build the dashboard" | Schema, queries, UI components, filters            |
| "Add authentication"  | Schema, middleware, login UI, session handling     |
| "Add drag and drop"   | Drag events, drop zones, state update, persistence |
| "Refactor the API"    | One story per endpoint or pattern                  |

**Rule of thumb:** If you cannot describe the change in 2-3 sentences, it is too big.

---

## Step 3: Story Ordering (Dependencies First)

Stories execute in priority order. Earlier stories must NOT depend on later ones.

**Correct order:**

1. Schema/database changes (migrations)
2. Server actions / backend logic
3. UI components that use the backend
4. Dashboard/summary views that aggregate data

**Wrong order:**

```
UI component (depends on schema that doesn't exist yet!)
Schema change
```

---

## Step 4: Acceptance Criteria (Must Be Verifiable)

Each criterion must be something Ralph can CHECK, not something vague.

### Good criteria (verifiable):

- "Add `status` column to tasks table with default 'pending'"
- "Filter dropdown has options: All, Active, Completed"
- "Clicking delete shows confirmation dialog"
- "Typecheck passes"
- "Tests pass"

### Bad criteria (vague):

- "Works correctly"
- "User can do X easily"
- "Good UX"
- "Handles edge cases"

## PRD Structure

`prd.json` is a JSON array of features where each object has this structure

```ts
{
   category: string
   description: string
   steps: string[]
   started: boolean
   complete: boolean
}
```

- `description` is a brief description of the feature and the problem it solves.
- `steps` is a list of specific, measurable objectives that need doing to complete the feature.
  - May also include "non-goals"; things that are out of scope for this feature.
  - May include existing components to reuse.
  - For features that change UI, also include: "Verify changes work in browser"
  - Always include as final criterion: "Ensure that all typecheck, test, and related lint npm scripts defined in package.json pass"

## Output

Save to `prd.json` in the current directory.

Also create `progress.txt`:

```markdown
# Progress Log

## Learnings

(Patterns discovered during implementation)

---
```

---

## Checklist Before Saving

- [ ] Asked clarifying questions with lettered options
- [ ] Incorporated user's answers
- [ ] All features use the specified JSON structure
- [ ] Each story completable in ONE iteration (small enough)
- [ ] Features are ordered by dependency (schema → backend → frontend)
- [ ] All criteria are verifiable (not vague)
- [ ] UI stories have "Verify changes work in browser"
- [ ] Saved prd.json and progress.txt
