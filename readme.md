# RNDM Test Generator
 
## About
 
When it comes to writing code, it is important to ensure you have a good level of tests. However, writing tests is one of the most laborious processes. This is why we designed the RNDM Test Generator.
 
RNDM Test Generator is a simple NPM module that can easily be integrated with any React Project. After installation, if code is written in a clean way then the test generation tool will kick in, build out tests and generate snapshots that can provide a base line for all future tests. What is more, the tool includes code coverage reports that will kick in immediately.
 
So with one simple command (npm run cover), you can go from a position of no tests to every file tested and extremely high code coverage. Let's take a look at how this works!
 
## Requirements
 
RNDM Test Generator has the following dev dependencies:

- babel-node-modules
- chai
- chai-as-promised
- mocha
- mocha-parallel-tests
- nyc
- proxyquire
- sinon
- sinon-chai
 
## Installation
 
### From NPM

```sh
npm install --save-dev @rndm/test-gen
```
 
Inside your package.json file, add or amend the test script:
 
```json
"test": "mocha \"./__tests__/unit/**/*.spec.js\" --opts ./__tests__/unit/_setup/mocha.opts"
```
 
Please Note: This can also be any other script name you choose. We have set it as test for simplicity. If you do use a different script name then remember to use this later in the code coverage script.
 
### Setup Files
 
After installation, the configuration requires a couple of setup files in order to run smoothly. First create a folder called _setup inside you test folder. e.g.

```sh
mkdir __tests__/unit/_setup
```

The add the following files:
 
* mocha.opts
* polyfill.js
* index.js

#### mocha.opts
 
This file is the options you will want to pass across to the mocha test runner. We use a few simple options here but for further documentation, you can visit the Mocha Documentation here.
 
The options we will include are as below:

```
--require babel-register
--reporter spec
--recursive
--timeout 10000
--require __tests__/unit/_setup/index.js
```
 
Copy and paste these into the mocha.opts file you created.
 
#### polyfill.js
 
This file allows us to make use of Babel to polyfill the @rndm/test-gen on the run (as it is ignored by the babel transpiler by default). In this file, simply add the one line as below:

```javascript
require('babel-node-modules')(['@rndm/test-gen']);
```

#### index.js
 
The index file is the one that will run all the underlying code for generating specs, serialised tests and the corresponding spapshot files. In here simply add the following lines of code to start the process running:

```javascript
import './polyfill';
import { generate } from '@rndm/test-gen';
generate();
```
 
Congratulations! You can now run your tests via the command-line with the simple command:

```sh
npm test
```

And all the respective files will be built (or errors thrown for invalid code 😉)
 
## Usage
 
### Config
 
After the initial installation, it is extremely simple to setup and run and does not require any additional configuration. However, there are a number of useful options available for making your expereince easier. If you do need these, then there are two options for integration into your application: package.json, or .rtgrc.json file. The below instructions will cover tools for integration and the keys in both can be used either inside package.json under the key "rtg" or within the .rtgrc.json file.
 
Please Note: The package.json will take precedence over any configurations duplicated inside the  .rtgrc.json file. So it is better to decide on using one of these options to avoid this causing unexpected results.
directory
 
This is the directory in which you will have your unit tests. It is relative to your project.
 
**Type**: String (relative path)

**Default Value**: "\_\_tests_\_\/unit"

**Example**:
```json
"directory": "__tests__/unit"
```
 
#### ignoreNodes
 
RNDM Test Generator reviews and requires modules as it needs to evaluate the output that should be resolved inside snapshots. When it does this, it can sometimes stub modules that it doesn't actually want to. Examples of this could be lodash or react, which provide important functionality for your app. Therefore this configuration option allows you to define nodes that you really want to run when testing so that you get the output you expect. By default The configuration ignores the following nodes:
 
- react
- lodash
- babel-runtime
- chai
- chai-as-promised
- enzyme
- enzyme-adapter-react-16
- sinon
- sinon-chai
- fs
- path
 
**Type**: Array<module name>

**Default Value**: []

**Example**:
```json
"ignoreNodes": [
  "fs-extra"
]
```
 
#### include
 
Out of the box, RNDM Test Generator will try to test every JavaScript file under your src folder. However, if you only want to test certain files, you can override this by using the include key. This allows you to provide paths to directories (and recursive sub directories) or files that will be added to your test suite.
 
**Type**: Array<path>

**Default Value**: []

**Example**:
```json
"include": [
  "src/app",
  "src/index.js"
]
```
This will test all JavaScript files in src/app and all sub directories, as well as index.js in the src folder, but ignore all other folders and files.
 
#### exclude
 
Like the above option, exclude gives more control over what will be added to your test suite. This can be used either independently or in conjunction with the include option to remove the items you don't want tested.
 
**Type**: Array<path>

**Default Value**: []

**Example**:
```json
"include": [
  "src/external",
  "src/index.js"
]
```
 
This will exclude all files in the external folder as well as the index.js file in the src folder, but will run tests against all other js files inside the src folder.
 
#### map
 
In RNDM Test Generator, it is possible to map some of your existing functionality into your other tests. For example if you have styles.js file, you might want this to provide results to your React components rather than be stubbed. In this case, you can provide a mapping function that will be picked up by the test library when running your tests to give the expected results.
 
**Type**: Array<Maps>

**Default Value**: []

**Example**:
```json
"map": [
  {
    "find": "styles",
    "to": "app/styles/index.js"
  }
]
 ```
In the above example, we are mapping any import that imports the styles file to the correct file in your application.
 
#### relative
 
If you are looking to include RNDM Test Generator as a library inside your project folder, rather than as a module. This flag will allow all the files generated to be run relative to this project. It is rare that you will need to do this. However, it is a flag that we have used since we dog-food this inside of the RNDM Test Generator package. (Yes we believe so much in our product that it is used to run tests directly on itself! For if you are interested, checkout the dogfood.js file inside of the test setup folder to see how we do this)
 
**Type**: Boolean

**Default Value**: false

**Example**:
```json
"relative": true
 ```
### Run Options
 
Run options are those options provided at run-time to the test suite.
 
#### removeSnapshots
 
The remove snapshots option allows you to delete any un used or old snapshots automatically. It receives an enum of values: true | 'all' | 'unused' | false
 
true/'all': This will remove all snapshots prior to running your test suite. This is an option you might want to use where there have been widespread changes to your code and you want to rebase your tests on the new code whilst dereferencing old snapshots.
 
'unused': This will remove any old and unused snapshots during your test run.
 
false (default value): This will leave existing snapshots untouched.
 
**Type**: Boolean

**Default Value**: false

**Example**:
 
//Inside your setup file (setup/index.js):
```javascript
generate({ removeSnapshots: 'unused' });
```
### NYC
 
Under the covers (pun intended), RNDM Test Generator makes use of Istanbul and NYC for code coverage.  In order to understand more about this suite of tools, you can view their documentation here.
 
To make use of this, you can add the following script in your package.json file:

```json
"cover": "nyc --check-coverage npm test"
```

However, there are a few items that you'll want to include in your NYC config. The below code is an example config, that will allow an easy integration into the [rndm-react-xp](https://github.com/rndm-com/rndm-react-xp):

```json 
"nyc": {
    "lines": 70,
    "include": [
      "src/**/*.js"
    ],
    "exclude": [
      "src/**/*.flow.js",
      "src/web",
      "src/index.js",
      "src/index.native.js",
      "flow-typed"
    ],
    "require": [
      "babel-core/register"
    ],
    "all": true,
    "sourceMap": false,
    "instrument": false
  }
```

This can be copied into your package,json file, but bear in mind that your code may be significantly different from this template, and may require further options to allow integration.
 
## Output Files
 
### Specs
 
#### Location
 
Within the context of RNDM Test Generator, specs are the JavaScript files that can run your tests. These are by default very simple file. When created by the library, they will be created under the folder {test path}/src. Each test file corresponds to the file path and file name within each of the folders included in your source code.
 
For example if you have a folder structure that looks like the below:

```
src/
  index.js
  app/
    index.js
    Component.js
```

The the corresponding spec files will look like this:

``` 
__tests_/unit/src/
  index.spec.js
  app/
    index.spec..js
    Component.spec..js
```

You will see this continuation of names throughout the output files so as to keep the process simpler.
 
#### Basic Usage
 
A spec file in its simplest form will contain only 4 lines:

```javascript
import { describe } from '@rndm/test-gen'; // The importing of the test generator code
import generated from '../_rtg_/_tests/index'; // The path to the corresponding serialised tests
const tests = generated; // A reassignment (we will cover this in a later section)
describe(tests); // the running of the tests
```

#### Intermediate Usage
 
We will discuss the composition of the serialised tests shortly, but for now, it is good to know that you can override the tests that are being passed into the describe function within this spect file. For example, you can add additional scenarios not automatically detected by the test generator as below:
 
```javascript
const tests = {
  ...generated,
  "default": [
    ...generated.default,
   {},
  ],
};
```
 
#### Advanced Usage
 
In essence the spec files are just simple spec files and can be used in the same way as any other mocha spec files. As such, if you want to add your own describe, it or expect functions, you can do so at the base level. However, the RNDM Test Generator also allows you to define these at various levels within the tests object.
 
For instance you are able to include:
 
- context functions under a context key in the base level, e.g.:

```javascript
const tests = {
  ...generated,
  "context": () => context('it has a context', () => {
    it('should run a test', () => {
      expect(true).to.equal(true)
    });
  }),
};
```
 
- it functions at a context level within the array, e.g.:

```javascript
const tests = {
  ...generated,
  "context": [
      () => {
      it('should run a test', () => {
        expect(true).to.equal(true)
      });
    },
  ],
};
```

Play around with what you can and cannot do and should there be a a feature you specifically require, feel free to ask or submit a pull request for us to review.
 
### Tests
 
Tests take the form of a serialised JSON file named the same as the original file and placed in the same file structure under a folder called _rtg/tests/ inside the unit test folder. When run through the describe function, these are analysed and executed. Upon initial run, the RNDM Test Generator will review the source directory to build out the basic tests for each of the exports from each source file. 
 
#### Basic Test
 
In its simplest form a JSON autogenerated test would look like the below examples:
```json
{
  "default": [
    {}
  ]
}
```
 
The breakdown of the above is that the initial object contains keys that point to named export from the file under test. For example should we have a the below as a piece of code:

// src/example.js
```javascript 
export const named = "this is a named export";
 
export default "this is a default export";
```
 
The generated test file would be:

// \_\_tests\_\_/unit/_rtg/src/example.json
```json 
{
  "default": [
    {}
  ],
  "named": [
    {}
  ]
}
```
 
#### Options: path
 
The path that the test will take to find the Subject Under Test (SUT). When default, the SUT will be the object itself. If another path is provided, then the test will be run against the element at the end of the path.
 
**Type**: String

**Default Value**: "default"

**Example**:
 
Given an the object below:

```javascript 
{
  example: () => true
}
```
 
A standard test either without the path option or the path option set to "default" will test the object itself. However, should you wish to test the output of the example path, this can be done by setting the test as below:

```json
{
  "default": [
    {
      "path": "example"
    }
}
```

Paths are '.' delimited, so you are able to specify deep paths for testing e.g. "example.example.1.example"
 
#### Options: expected
 
The type of expectation we will use. For full expectation paths visit the Automattic website here. By default, this will output to a snapshot file, described in the section below.
 
**Type**: String

***Default Value**: "to.matchSnapshot"
 
#### Options: expectation
 
Should a the expected option above require an actual expectation, this can be provided here.
 
**Type**: Any

**Default Value**: undefined
 
#### Options: args
 
An array of arguments that can be passed into either a function or a class when executing.
 
**Type**: Array<Any>

**Default Value**: undefined
 
#### Options: stubs
 
An Object defined the stubbed classes you want to provide and the output you want to return for the stubbed properties.
 
**Type**: Object

**Default Value**: {}
 
#### Options: returnDefault
 
Used when you want to differentiate between exports in the file (should a file contain more than one export)
 
**Type**: Boolean

**Default Value**: false

#### Options: it
 
An optional way of passing in a standard it function test.
 
**Type**: Function

**Default Value**: undefined
 
#### Options: description
 
An optional description to override the automated description.
 
**Type**: Boolean

**Default Value**: false
 
### Snapshots
 
Snapshots are a powerful tool for generating the output of a test. On initial execution, the output is rendered into a JSON file under the description key. Upon further executions, you are able to compare the test results against this initial baseline and make decisions as to whether you want to edit the output, the test or the original source file. We opted to use JSON as the file type, since it is simple to use with the context of JavaScript.
 
#### Example:

// WelcomeMessage.js

```javascript 
import React from 'react';
import { Text } from 'react-native';
 
const WelcomeMessage = ({ style = {} } = {}) => (
  <Text style={style}>Welcome to RNDM React Cross Platform (XP)</Text>
);
 
export default WelcomeMessage;
```javascript
 
// Test File: WelcomeMessage.json

```json
{
  "default": [
    {
      "args": []
    }
  ]
}
```
 
// Snapshot File: WelcomeMessage.JSON

```json
{
  "default.default with [] is expected to.matchSnapshot": {
    "value": {
      "key": null,
      "ref": null,
      "props": {
        "style": {},
        "children": "Welcome to RNDM React Cross Platform (XP)"
      },
      "_owner": null,
      "_store": {}
    }
  }
}
```
