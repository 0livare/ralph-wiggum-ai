# Ralph Wiggum AI

Opinionated implementation of the [Ralph Wiggum AI technique][ralph-article].

Ralph solves the AI context window problem in the most simplistic way possible; keep feeding **_new_** AI sessions the same prompt until the job is done.

> "Ralph is a Bash loop."
> \- [Geoffrey Huntley](https://ghuntley.com/ralph)

---

> Anthropic's official [ralph plugin][anthropic-plugin] **gets the core principle of Ralph wrong** by [preventing a **single instance** of claude from exiting][anthropic-plugin-core-concept], rather than continuously starting new sessions.

![ralph](https://github.com/user-attachments/assets/f8d33398-c996-4699-9dc6-4571bee76510)

[ralph-article]: https://venturebeat.com/technology/how-ralph-wiggum-went-from-the-simpsons-to-the-biggest-name-in-ai-right-now?ref=ghuntley.com
[anthropic-plugin]: https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum
[anthropic-plugin-core-concept]: https://github.com/anthropics/claude-code/blob/f860f671dc050ea42076dff34edc33871329f7ac/plugins/ralph-wiggum/README.md?plain=1#L22

## Installation

> ### Prerequisites
>
> 1. This package depends on Bun being [installed globally](https://bun.sh/docs/installation)
> 1. Claude Code must be must be [installed and configured](https://code.claude.com/docs/en/quickstart#step-1:-install-claude-code)

```bash
# Create a global `ralph` cli command
npm i -g ralph-wiggum-ai
```

## Usage

Before setting Ralph to work, you need to create a PRD (product requirements document) `prd.json` file that defines the tasks for Ralph to perform.

```bash
# Generate a sample prd.json file for you to edit
ralph prd
```

> Feel free to modify the shape of the tasks, so long as the `complete` field remains as a boolean.
>
> This default PRD task shape was inspired by [this article](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) from Anthropic
>
> Using AI to iterate on this PRD file itself is a great way to bootstrap Ralph's work!

Start the Ralph Wiggum loop:

```bash
ralph
```

### Flags

```bash
-i, --max-iterations <number>    Maximum number of iterations to run (default: 10)
-s, --sequential                 Process tasks in sequential order instead of by priority
-v, --version                    Print version number
-h, --help                       Print help information
```

### Subcommands

```bash
prd    Generate a prd.json file with sample task
```

## Development

> You must have [Bun](https://bun.sh/docs/installation) installed globally.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun ralph
```

To link the global `ralph` command to this local development version:

```bash
bun link
```
