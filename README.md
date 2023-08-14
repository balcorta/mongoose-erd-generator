Mongoose-erd-generator
===============================

A tool that extracts  information from mongoose schemas and turns them into a ERD diagram.
This version is updated to work with ES6

Installation
-----

`npm install https://github.com/balcorta/mongoose-erd-generator -g`

Running the script
-----
Usage: mongoose-erd-generator [options]

##### Options:

    -V, --version                                                 output the version number
    -p, --path <path>                                             set models path wanted to generate an ERD from.
    -o, --output <path>                                           set output path
    -i, --ignore-index                                            ignore any files called index.js
    -f, --format [svg,dot,xdot,plain,plan-ext,ps,ps2,json,json0]  
    -tc, --titlecolor <titlecolor>
    -bc, --backgroundcolor <backgroundcolor>                                           
    -h, --help                                 

example
-------        
##### Global install:
`npm install https://github.com/balcorta/mongoose-erd-generator -g`

##### Run CMD:
###### MAC / LINUX
`mongoose-erd-generator -p ./path_to_models_folder/ -f svg -o ./erd.svg`

###### WINDOWS
`mongoose-erd-generator -p .\path_to_models_folder\ -f svg -o .\erd.svg`
