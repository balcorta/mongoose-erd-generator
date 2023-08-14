#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import * as process from 'process';
import { readdir } from 'node:fs/promises';

import {writeFileSync}from 'fs';

import * as util from 'util';

// const readdir = util.promisify(fs.readdir)
import * as path from 'path';
import {generateFromModels} from '../lib/ERD.js';
const allowedFormats=["svg", "dot", "xdot", "plain", "plain-ext", "ps", "ps2", "json", "json0"];
const main = async () => {
  try {
    program
      .version('0.1.0')
      .option('-p, --path <path>', 'set models path wanted to generate an ERD from.')
      .option('-o, --output <path>', 'set output path')
      .option('-f, --format [svg,dot,xdot,plain,plan-ext,ps,ps2,json,json0]')
      .option('-tc, --titlecolor <titleColor>')
      .option('-bc, --backgroundcolor <bodyColor>')
      .option('-i, --ignore-index','ignore any files called index.js')
      .parse(process.argv);
    if(allowedFormats.indexOf(program.format)==-1){
        console.error(`Format :'${program.format}', is not supported.`);
        return;
    }
    if (program.path && program.output) {

      const modelDirectory = path.resolve(program.path);
      const outputFilePath = program.output;
      const modelsPath = await readdir(modelDirectory);
      const models = [];
      for (const _model of modelsPath) {
        if (_model.indexOf('.js') != -1 && !(_model === "index.js" && program.ignoreIndex)){
          // const model = require(path.join(modelDirectory, _model));
          const modelUri = path.join(modelDirectory, _model);
          
          const modelUrl = new URL(modelUri, import.meta.url);
          const tst = await import(modelUrl);
          const model = tst.default          
          models.push(model);
        }
      }
      const svg = await generateFromModels(models, {
        format:program.format,
        collection: {
          nameColor: program.titleColor || '#222',
          backgroundColor: program.bodyColor || '#E6ECF5'
        }
      });

      writeFileSync(outputFilePath, svg);
      console.info('ERD written to',outputFilePath);
    }
  } catch (e) {
    console.error(e)
    throw e;
  }
}
//////////////////////
main();
