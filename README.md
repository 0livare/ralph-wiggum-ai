# Ralph Wiggum AI

Opinionated implementation of the [Ralph Wiggum AI technique][ralph-article].

[ralph-article]: https://venturebeat.com/technology/how-ralph-wiggum-went-from-the-simpsons-to-the-biggest-name-in-ai-right-now?ref=ghuntley.com

## Installation

```bash
# ralphwiggum depends on bun being installed globally
npm i -g bun

# Creates a global `ralph` cli command
npm i -g ralphwiggum
```

## Usage

Run the `ralph` command

```bash
ralph [command] [flags]
```

### Flags

```bash
-i, --max-iterations <number>    Maximum number of iterations to run (default: 10)
-v, --version                    Print version number
-h, --help                       Print help information
```

### Subcommands

```bash
prd    Generate a prd.json file with sample task
```

### Getting Started

1. Generate a sample `prd.json` file:

   ```bash
   ralph prd
   ```

2. Edit the `prd.json` file to define your tasks

3. Run the Ralph Wiggum loop:
   ```bash
   ralph
   ```

<!-- ## Examples -->

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
