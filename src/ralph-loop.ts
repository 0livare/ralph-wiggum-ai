import chalk from 'chalk'
import {printInfo, printError, readCwdFile} from './helpers'
import type {Task} from './types'

export async function ralphLoop(args: {prompt: string; maxIterations: number}) {
  const {prompt, maxIterations} = args

  printInfo(`Starting Ralph`)
  printInfo('')

  for (let i = 1; i <= maxIterations; i++) {
    printInfo('===========================================')
    printInfo(`  Iteration ${i} of ${maxIterations}`)
    printInfo('===========================================')

    const proc = Bun.spawn(
      ['claude', '--dangerously-skip-permissions', '-p', prompt],
      {
        stdout: 'pipe',
        stderr: 'inherit',
      },
    )

    const exitCode = await proc.exited
    if (exitCode !== 0) {
      printError(`Claude exited with code ${exitCode}`)
      await Bun.sleep(2_000)
      continue
    }

    // @ts-expect-error -- This is valid in Bun
    const claudeResponse = await proc.stdout.text()
    console.info(chalk.gray(claudeResponse))
    printInfo('')

    const tasks = (await readCwdFile('prd.json').json()) as Task[]
    // if (result.includes('<promise>COMPLETE</promise>')) {
    if (tasks.every((task) => task.complete)) {
      printInfo('===============================================')
      printInfo(`  All PRD tasks complete after ${i} iterations!`)
      printInfo('===========================================')
      process.exit(0)
    }

    await Bun.sleep(2_000)
  }

  printInfo('===========================================')
  printInfo(`  Reached max iterations (${maxIterations})`)
  printInfo('===========================================')
  process.exit(1)
}
