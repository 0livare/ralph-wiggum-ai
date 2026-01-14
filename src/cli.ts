import {parseArgs} from 'util'
import chalk from 'chalk'
import {printError} from './helpers'

export function parseCliArgs() {
  let args
  try {
    args = parseArgs({
      args: Bun.argv,
      options: {
        'max-iterations': {type: 'string', short: 'i'},
        help: {type: 'boolean', short: 'h'},
        version: {type: 'boolean', short: 'v'},
      },
      strict: true,
      allowPositionals: true,
    })
  } catch (e: any) {
    printError(e.message)
    process.exit(1)
  }

  return args.values
}
