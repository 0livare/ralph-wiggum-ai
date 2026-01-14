import chalk from 'chalk'
import type {Task} from '../types'
import {printError} from '../helpers'

export async function prd() {
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
    passes: false,
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
