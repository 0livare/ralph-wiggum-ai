#!/usr/bin/env bun
import chalk from 'chalk'
import {parseCliArgs} from './cli'
import {help, prd, version} from './commands'
import {print, printError, readCliFile, readCwdFile} from './helpers'
import {ralphLoop} from './ralph-loop'
import type {Task} from './types'

const DEFAULT_MAX_ITERATIONS = 10

async function main() {
  const cli = parseCliArgs()

  if (cli.values.help) {
    help()
    process.exit(0)
  }
  if (cli.values.version) {
    version()
    process.exit(0)
  }

  // Check for subcommands
  const subcommand = cli.positionals[2] // argv[0] is bun, argv[1] is script path
  if (subcommand === 'prd') {
    await prd()
    process.exit(0)
  }

  let maxIterations = cli.values['max-iterations']
    ? parseInt(cli.values['max-iterations'])
    : null
  if (maxIterations === null) {
    console.info(
      chalk.gray(
        `No max iterations specified, defaulting to ${DEFAULT_MAX_ITERATIONS}. Use --max-iterations to set a limit.`,
      ),
    )
    maxIterations = DEFAULT_MAX_ITERATIONS
  }

  const prdFile = readCwdFile('prd.json')
  if (!(await prdFile.exists())) {
    printError('Error: prd.json not found in the current directory.')
    process.exit(1)
  }
  const tasks = (await prdFile.json()) as Task[]
  const incompleteTaskCount = tasks.filter((task) => !task.complete).length
  print(`Found prd.json file with ${incompleteTaskCount} incomplete tasks.`)

  const prompt = await readCliFile('prompt.md').text()
  await ralphLoop({prompt: `@prd.json @progress.txt ${prompt}`, maxIterations})
}

await main()
