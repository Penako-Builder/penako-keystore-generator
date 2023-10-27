"use strict";

const path = require('path');
const pkg = require("../package.json");
const fs = require('fs');
const commandLineUsage = require('command-line-usage');

/**
 * kg namespace.
 * @type {Object.<string,*>}
 */
var kg = {};

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const sections = [
    {
        header: 'Keystore Generator ' + pkg['version'],
        content: 'Generates keystores and signs apk files simply.'
    },
    {
        header: 'Synopsis',
        content: [
          '$ kg key generate',
          '$ kg key sign {bold --src} {underline apk-file} {bold --keystore} {underline keystore-file}',
          '$ kg {bold --help}'
        ]
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'src',
                alias: 's',
                typeLabel: '{underline file}',
                description: 'Apk file to sign.'
            },
            {
                name: 'keystore',
                alias: 'k',
                typeLabel: '{underline file}',
                description: 'Keystore file to sign the apk file.'
            },
            {
                name: 'help',
                alias: 'h',
                description: 'Print this usage guide.'
            }
        ]
    }
];

const usage = commandLineUsage(sections);

kg.promptQuiz = function(quiz) {
    return new Promise((resolve, reject) => {
        readline.question(quiz, (answer) => {
            answer ? resolve(answer):resolve('Unknown');
        });
    });
};

kg.closeReadline = function() {
    readline.close();
};

kg.printUsage = function() {
    // process.stderr.write([
    //     ' ' + pkg['description'] + ' ' + pkg['version'],
    // ].join('\n') + '\n\n' + " Usage: " + path.basename(process.argv[1]) + " key generate\n");
    process.stderr.write(usage);
    
    process.exit(1);
};

kg.checkSourceExists = function(src) {
    try {
        if (fs.lstatSync(src).isFile()) {
            const ext = path.extname(src);

            if (ext === '.apk') {
                return true;
            }
            
            return false;
        }

        return false;
    } catch(err) {
        return false;
    }
};

kg.checkKeystoreExists = function(keystore) {
    try {
        if (fs.lstatSync(keystore).isFile()) {
            const ext = path.extname(keystore);

            if (ext === '.keystore') {
                return true;
            }
            
            return false;
        }

        return false;
    } catch(err) {
        return false;
    }
};

module.exports = kg;