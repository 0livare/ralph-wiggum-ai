#!/usr/bin/env bun
import {parseCliArgs} from './cli'
import {help, version} from './commands'
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

  const prompt = await Bun.file('./prompt.md').text()
  const maxIterations = parseInt(cli['max-iterations'] ?? '10')
  await ralphLoop({prompt, maxIterations})
}

await main()
