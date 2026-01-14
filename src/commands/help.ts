import chalk from 'chalk'
import pkg from '../../package.json'

export function help() {
  console.info('\n' + pkg.description + '\n')

  console.info(
    `${chalk.bold('Usage:')} ${chalk.bold.green('ralph')} ${chalk.cyan('[command]')} ${chalk.cyan('[flags]')}`,
  )

  // Commands
  console.info(`\n${chalk.bold('Subcommands:')}`)
  console.info(
    `  ${chalk.cyan('prd')}                                Generate a prd.json file with sample task`,
  )

  // Flags
  console.info(`\n${chalk.bold('Flags:')}`)
  console.info(
    `  ${chalk.cyan('-i')}, ${chalk.cyan('--max-iterations')} <number>    Maximum number of iterations to run (default: 10)`,
  )
  console.info(
    `  ${chalk.cyan('-v')}, ${chalk.cyan('--version')}                    Print version number`,
  )
  console.info(
    `  ${chalk.cyan('-h')}, ${chalk.cyan('--help')}                       Print help information`,
  )

  // Examples
  // console.info(`\n${chalk.bold('Examples:')}`)
  // console.info(
  //   chalk.bold.green('  in'),
  //   '                   ',
  //   chalk.gray('Install all project dependencies'),
  // )
  // console.info(
  //   chalk.bold.green('  in express'),
  //   '           ',
  //   chalk.gray('Add a project dependency'),
  // )
  // console.info(
  //   chalk.bold.green('  in --dev nodemon'),
  //   '     ',
  //   chalk.gray('Add a project development dependency'),
  // )
  // console.info(
  //   chalk.bold.green('  in react immer axios'),
  //   ' ',
  //   chalk.gray('Add multiple project dependencies at once'),
  // )
}
