import {print, printError, readCwdFile} from './helpers'
import type {Task} from './types'

export async function ralphLoop(args: {prompt: string; maxIterations: number}) {
  const {prompt, maxIterations} = args

  print(`Starting Ralph`)
  print('')

  for (let i = 1; i <= maxIterations; i++) {
    print('===========================================')
    print(`  Iteration ${i} of ${maxIterations}`)
    print('===========================================')

    const proc = Bun.spawn(
      ['claude', '--dangerously-skip-permissions', '-p', prompt],
      {
        stdout: 'pipe',
        stderr: 'inherit',
      },
    )

    // @ts-expect-error -- This is valid in Bun
    const result = await proc.stdout.text()
    const exitCode = await proc.exited

    if (exitCode !== 0) {
      printError(`Claude exited with code ${exitCode}`)
      process.exit(exitCode)
    }

    print(result)
    print('')

    const tasks = await readCwdFile('prd.json').json()
    const isEveryTaskComplete = (tasks as Task[]).every(
      (task) => task.complete === true,
    )

    // if (result.includes('<promise>COMPLETE</promise>')) {
    if (isEveryTaskComplete) {
      print('===============================================')
      print(`  All PRD tasks complete after ${i} iterations!`)
      print('===========================================')
      process.exit(0)
    }

    await Bun.sleep(2_000)
  }

  print('===========================================')
  print(`  Reached max iterations (${maxIterations})`)
  print('===========================================')
  process.exit(1)
}
