import chalk from 'chalk'
import path from 'node:path'
import type {Task} from '../../types'
import {printError, printInfo, readCliFile} from '../../helpers'

interface PrdOptions {
  message?: string
  file?: string
  sample?: boolean
}

export async function prd(options: PrdOptions = {}) {
  // If --sample flag is provided, generate sample file
  if (options.sample) {
    await generateSamplePrd()
    return
  }

  // Require either -m or -f flag when --sample is not provided
  if (!options.message && !options.file) {
    printError('Error: Either --sample, -m, or -f flag must be provided')
    printInfo('Run "ralph --help" for usage information')
    process.exit(1)
  }

  // Get user's task description
  let taskDescription: string
  if (options.file) {
    const file = Bun.file(options.file)
    if (!(await file.exists())) {
      printError(`Error: File not found: ${options.file}`)
      process.exit(1)
    }
    taskDescription = await file.text()
  } else if (options.message) {
    taskDescription = options.message
  } else {
    printError('Error: Either -m or -f flag must be provided')
    process.exit(1)
  }

  const prdPrompt = await readCliFile('commands/prd/prd-prompt.md').text()
  // Combine the prompt with user's task description
  const fullPrompt = `${prdPrompt}\n\n---\n\n## User's Task Description\n\n${taskDescription}`

  printInfo('Generating PRD with Claude Code...')
  printInfo('')

  // Spawn Claude in interactive mode
  // Note: Do NOT use -p flag as it's for non-interactive "print and exit" mode
  const proc = Bun.spawn(['claude', fullPrompt], {
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  })

  const exitCode = await proc.exited
  if (exitCode !== 0) {
    printError(`Claude exited with code ${exitCode}`)
    process.exit(1)
  }

  printInfo('')
  printInfo(chalk.green('PRD generation complete!'))
}

async function generateSamplePrd() {
  const sampleTask: Task = {
    category: 'authentication',
    description: 'Implement user authentication system',
    steps: [
      'Create user model with email and password fields',
      'Implement password hashing using bcrypt',
      'Create login and registration endpoints',
      'Add JWT token generation and validation',
      'Implement middleware for protected routes',
    ],
    started: false,
    complete: false,
  }

  const prdData = [sampleTask]
  const filePath = './prd.json'

  try {
    await Bun.write(filePath, JSON.stringify(prdData, null, 2))
    console.info(chalk.green(`Created prd.json with sample task`))
  } catch (error) {
    printError('Error creating prd.json: ' + error)
    process.exit(1)
  }
}
