
#Project set up

This configures the project from scratch and all examples will start from here.

##Quick Setup

1. Windows nodejs version 6.x 
1. Installed 6.x MSI version
1. Give permissions as requested
1. Download johnny five lab
1. Extract lab
1. Run Nodejs command prompt
1. cd Downloads/johnnyfivelab-master/johnnyfivelab-master
1. type: "npm install"
1. Allow run to completion
1. Install Arduino as administrator
1. Need a local editor in addition to Arduino
1. Run Arduino
1. Install chipKIT core
1. Uploaded arduino/standardFirmatachipKITledstrip to Fubarino Mini
1. Edit blink.js for correct com port. com4 for me.
1. node blink.js should work
1. node server-io.js 

##Setup explanation

###Useful command line commands:
* mkdir
* pwd
* npm
* node
* cd
*  

###Setup

Let's set up the basic project we'll use for the workshop.

```
$ mkdir HelloLab
$ [mkdir HelloLab] ~/projects/ricklon                                                                                          
$ cd HelloLab
$[cd HelloLab] ~/projects/ricklon/HelloLab                                                                                    
$ npm init
```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

```
Press ^C at any time to quit.
name: (HelloLab)
Sorry, name can no longer contain capital letters.
name: (HelloLab) hellolab
version: (1.0.0)
description: Hello World for chipKIT, Node.js with Johny-Five
entry point: (index.js) blink.js
test command: node blnk.js
git repository:
keywords:
author: Rick Anderson
license: (ISC) Apache 2.0
Sorry, license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>" and license is similar to the valid expression "Apache-2.0".
license: (ISC) apache2.0
Sorry, license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>" and license is similar to the valid expression "Apache-2.0".
license: (ISC) Apache-2.0
About to write to /Users/rickanderson/projects/ricklon/HelloLab/package.json:
```
It then creates a package.json file that describes the project and keeps track of the modules you use in your project.

```
{
  "name": "hellolab",
  "version": "1.0.0",
  "description": "Hello World for chipKIT, Node.js with Johny-Five",
  "main": "blink.js",
  "scripts": {
    "test": "node blnk.js"
  },
  "author": "Rick Anderson",
  "license": "Apache-2.0"
}


Is this ok? (yes)
machine1 [npm init] ~/projects/ricklon/HelloLab   
```

This set's up the basic node.js work area. I've added the readme.md as the second step. This provides the instructions on how to get started and the step by step guide to get going.

###Install packages
Packages are libraries that are available to any node.js application. It makes sharing code, dependencies, libraries, and keeping track of versions of libraries automatic.

npm install package_name --save //installs packages
npm remove package_name //removes the packages
npm update // upgrades the packages

For this project we'll have most everything already in the project folder. But here's how you install what we need to get started with.

```npm install johnny-five --save```

The following is the log of what happened. The  johnny-five module is download and the dependencies  are created. The flag "--save" saves the module johnny-five into the package.json file.

```
$ npm install johnny-five --save

> serialport@3.1.2 install /Users/rickanderson/projects/ricklon/HelloLab/node_modules/serialport
> node-pre-gyp install --fallback-to-build

[serialport] Success: "/Users/rickanderson/projects/ricklon/HelloLab/node_modules/serialport/build/Release/serialport.node" is installed via remote
hellolab@1.0.0 /Users/rickanderson/projects/ricklon/HelloLab
└── johnny-five@0.9.53  extraneous

npm WARN hellolab@1.0.0 No repository field.
$ [npm install johnny-five] ~/projects/ricklon/HelloLab                                                                                
$ cat package.json
{
  "name": "hellolab",
  "version": "1.0.0",
  "description": "Hello World for chipKIT, Node.js with Johny-Five",
  "main": "blink.js",
  "scripts": {
    "test": "node blnk.js"
  },
  "author": "Rick Anderson",
  "license": "Apache-2.0",
  "dependencies": {
    "johnny-five": "^0.9.53"
  }
}
```

johnny-five is now installed.

###Configure Fubarino Mini

Go to the Arduino IDE with the chipKIT-core installed. Scroll down to the Firmata library examples. Then select and load "StandardFirmataChipKIT" once that is loaded onto the Fubarino Mini we are ready to talk to it via Node.js and Johnny-five.

Important note about scope. The "var" declares where a variables scope starts. More explanation here.
