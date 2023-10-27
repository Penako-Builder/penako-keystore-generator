Penako Keystore Generator
=========
Simplest way to generate keystores and sign apk files, don't want to rembember longer commands. To work this module perfectly Java JDK should be installed and java path variable should be present.

Usage
-----
You can use this library to generate a keystore and sign apk files simply.

To generate keystore on working directory run
`kg key generate`

To sign an apk file, run
`kg key sign --src apkfile --keystore keystorefile` 

To get usage guid, run
`kg --help`

Library uses below command to generate the keystore file,

`keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`

and below command to sign apk

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name`

License
-------
GNU GPL ([see](https://github.com/Penako-Builder/penako-keystore-generator/blob/main/LICENSE))