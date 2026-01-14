#!/usr/bin/env bun
import {parseCliArgs} from './cli'
import {help, version} from './commands'
import {printError, readCliFile, readCwdFile} from './helpers'
import {ralphLoop} from './ralph-loop'

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

  const maxIterations = parseInt(cli['max-iterations'] ?? '10')

  const tasksExist = await readCwdFile('tasks.json').exists()
  if (!tasksExist) {
    printError('Error: tasks.json not found in the current directory.')
    process.exit(1)
  }

  const prompt = await readCliFile('prompt.md').text()
  await ralphLoop({prompt, maxIterations})
}

await main()
