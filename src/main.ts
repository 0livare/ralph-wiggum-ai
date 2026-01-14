#!/usr/bin/env bun
import chalk from 'chalk'
import {parseCliArgs} from './cli'
import {help, version} from './commands'
import {printError, readCliFile, readCwdFile} from './helpers'
import {ralphLoop} from './ralph-loop'

const DEFAULT_MAX_ITERATIONS = 10

async function main() {
  const cli = parseCliArgs()

  if (cli.help) {
    help()
    process.exit(0)
  }
  if (cli.version) {
    version()
    process.exit(0)
  }

  let maxIterations = cli['max-iterations']
    ? parseInt(cli['max-iterations'])
    : null
  if (maxIterations === null) {
    console.info(
      chalk.gray(
        `No max iterations specified, defaulting to ${DEFAULT_MAX_ITERATIONS}. Use --max-iterations to set a limit.`,
      ),
    )
    maxIterations = DEFAULT_MAX_ITERATIONS
  }

  const tasksExist = await readCwdFile('tasks.json').exists()
  if (!tasksExist) {
    printError('Error: tasks.json not found in the current directory.')
    process.exit(1)
  }

  const prompt = await readCliFile('prompt.md').text()
  await ralphLoop({prompt, maxIterations})
}

await main()
