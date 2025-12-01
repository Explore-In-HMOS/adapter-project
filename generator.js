const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
    if (src.includes(".git")) return;
    if (src.includes("oh_modules")) return;
    if (src.includes(".idea")) return;
    if (src.includes(".cache")) return;
    if (src.includes(".hvigor")) return;
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        fs.statSync(srcPath).isDirectory()
            ? copyDir(srcPath, destPath)
            : fs.copyFileSync(srcPath, destPath);
    });
}

const deleteBuildDir = (src) => {
    const buildPath = path.join(src, "build");
    if (fs.existsSync(buildPath)) {
        fs.rmSync(buildPath, { recursive: true, force: true });
    }
}

function updateBuildProfile(buildProfilePath, targetProjectName) {
    let content = fs.readFileSync(buildProfilePath, 'utf8');
    content = content.replace(/,(\s*[}\]])/g, '$1');
    const profile = JSON.parse(content);
    fs.writeFileSync(buildProfilePath, JSON.stringify(profile, null, 2));
}

const bigintLiteralPattern = /\b\d+n\b/g;
const bigintCallPattern = /\bBigInt\s*\(/g;

function detectBigIntUsage(file) {
    const lines = fs.readFileSync(file, "utf8").split("\n");

    lines.forEach((line, index) => {
        if (bigintLiteralPattern.test(line)) {
            console.log(
                '\x1b[33m%s\x1b[0m',
                `BigInt literal detected -> ${file}:${index + 1}: Lite wearable devices doesn't support BigInt type.`
            );
        }
        if (bigintCallPattern.test(line)) {
            console.log(
                '\x1b[33m%s\x1b[0m',
                `BigInt() constructor detected -> ${file}:${index +
                1}: Lite wearable devices doesn't support BigInt type.`
            );
        }
    });
}

function warnBigIntUsage(targetDir) {
    const files = listJsFiles(targetDir);
    files.forEach(detectBigIntUsage);
}

function normalizeConfig(config, targetProjectName, command) {
    const ability = config.module.abilities?.[0];

    if (command === "gen-smart") {
        Object.assign(ability, {
            formsEnabled: false,
            launchType: "standard",
            orientation: "unspecified",
            skills: [{ actions: ["action.system.home"], entities: ["entity.system.home"] }],
            visible: true,
        });

        config.app = {
            ...config.app,
        };

        config.module.deviceType = ["wearable"];
        config.module.distro.installationFree = false;
        config.module.js[0].window = { autoDesignWidth: false, designWidth: 466 };
        config.module.mainAbility = ".MainAbility";
        config.module.package = config.app.bundleName;
    }

    if (command === "gen-lite") {
        config.module.deviceType = ["liteWearable"];

        config.module.distro = {
            deliveryWithInstall: true,
            moduleName: "entry",
            moduleType: "entry",
        };

        if (ability) {
            delete ability.formsEnabled;
            delete ability.orientation;
            delete ability.skills;
            delete ability.visible;
            delete ability.launchType;
            ability.type = "page";
        }

        if (config.module.js?.[0]?.window) {
            delete config.module.js[0].window;
        }

        delete config.module.mainAbility;
        delete config.module.name;
        delete config.module.package;

        config.app = {
            ...config.app,
            bundleName: config.app.bundleName
        };

        config.deviceConfig = config.deviceConfig || {};
    }

    return config;
}

function parseArgs() {
    const [, , command, sourceFolderName, targetProjectName] = process.argv;
    if (!["gen-smart", "gen-lite"].includes(command) || !sourceFolderName || !targetProjectName) {
        throw new Error("Usage: node generator.js <gen-smart|gen-lite> <sourceFolderName> <targetProjectName>");
    }
    return { command, sourceFolderName, targetProjectName };
}

const listJsFiles = (dir) =>
    fs.readdirSync(dir)
        .flatMap((f) => {
            const full = path.join(dir, f);
            return fs.statSync(full).isDirectory() ? listJsFiles(full) : full;
        })
        .filter((f) => f.endsWith(".js"));

const importPattern = /^\s*import\s.+\sfrom\s+['"](@ohos[./]|@system[./]).+['"]\s*;?/;

const commentImports = (file) => {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    const newLines = lines.map((l) => (importPattern.test(l) ? `// ${l}` : l));
    if (lines.join("\n") !== newLines.join("\n")) {
        fs.writeFileSync(file, newLines.join("\n"));
        console.log('\x1b[33m%s\x1b[0m', `Native import found and commented, please update: ${file}`);
    }
};

const commentNativeDeps = (targetDir) => {
    listJsFiles(targetDir).forEach(commentImports);
}

const wearEnginePattern = /['"]@hwbundle\/wearengine['"]/;

function detectWearEngineUsage(dir) {
    const files = listJsFiles(dir);
    return files.some(file => {
        const content = fs.readFileSync(file, 'utf8');
        return wearEnginePattern.test(content);
    });
}

function printSeparator() {
    console.log('\x1b[36m%s\x1b[0m', '='.repeat(90));
}

function printWarningHeader(title) {
    printSeparator();
    console.log('\x1b[31m%s\x1b[0m', `WARNING: ${title}`);
    printSeparator();
}

function printSection(title, content) {
    console.log('\n\x1b[33m%s\x1b[0m', `${title}:`);
    if (Array.isArray(content)) {
        content.forEach(line => console.log(`   ${line}`));
    } else {
        console.log(`   ${content}`);
    }
}

function printCodeBlock(title, code) {
    console.log('\n\x1b[33m%s\x1b[0m', `${title}:`);
    console.log('\x1b[90m%s\x1b[0m', code);
}

function showWearEngineWarningLiteToSmart() {
    printWarningHeader('Wear Engine Configuration Required');
    console.log('\x1b[37m%s\x1b[0m', 'Transitioning from Lite JS Project to Smart JS Project\n');

    console.log('Please check Wear Engine fingerprint and configuration settings carefully.\n');

    printSection('1. AppID Configuration', [
        'Smart wearable devices use an AppID for fingerprint on mobile.',
        'Configure your mobile application accordingly.'
    ]);

    printSection('2. Bundle Name Matching', [
        'Bundle name must match the Smart JS project bundle name.',
        'Ensure Smart JS is entered correctly on both phone and wearable side.'
    ]);

    printSection('3. Ability Name Requirement', [
        'Ability Name MUST be "HiWearMainAbility"',
        'This is essential to launch the wearable app from the mobile app.'
    ]);

    printCodeBlock('   Required config.json structure', `
   "module": {
     "abilities": [
       {
         "startWindowIcon": "xxxx",
         "startWindowBackground": "xxxx",
         "name": ".HiWearMainAbility",      // Name must be HiWearMainAbility
         "srcPath": "HiWearMainAbility"     // Path to the ability
       }
     ]
   }`);

    printSection('4. Prevent Background App Duplication', [
        'Avoid launching a new background app on every ping.',
        'Add singleton launch type to your config.json'
    ]);

    printCodeBlock('   Required config.json entry', `
   "abilities": [
     {
       "launchType": "singleton"
     }
   ]`);

    printSection('5. Remote App Name List Configuration', [
        'You can specify multiple mobile bundle names, separated by commas.',
        'Total value must be less than 4KB.'
    ]);

    printCodeBlock('   Example config.json entry', `
   "metaData": {
     "customizeData": [
       {
         "name": "wearEngineRemoteAppNameList",
         "value": "mobileappbundlename1, mobileappbundlename2"
       }
     ]
   }`);

    printSeparator();
    console.log('');
}

function showWearEngineWarningSmartToLite() {
    printWarningHeader('Wear Engine Configuration Required');
    console.log('\x1b[37m%s\x1b[0m', 'Transitioning from Smart Wearable JS Project to Lite Wearable JS Project\n');

    printSection('Configuration Removal', [
        'Remove all Smart JS configurations listed below:',
        '- HiWearMainAbility',
        '- launchType: singleton',
        '- wearEngineRemoteAppNameList metaData'
    ]);

    printSection('Fingerprint Configuration Changes', [
        'DO NOT use AppID for fingerprint with lite wearable bundle name on mobile app side.',
        'Use the lite wearable fingerprint format instead.'
    ]);

    printSection('Mobile Side Fingerprint Format', [
        'Mobile side fingerprint used for lite wearable package:',
        'Format: App_package_name_base64Encode(pubKey)',
        '',
        'Reference documentation:',
        'https://developer.huawei.com/consumer/en/doc/connectivity-Guides/signature-0000001053969657'
    ]);

    printSection('Lite Wearable Side Fingerprint', [
        'For setPeerFingerPrint method:',
        'Use Mobile App SHA-256 certificate fingerprint.',
        'IMPORTANT: Remove all ":" characters from the fingerprint.'
    ]);

    printSection('LiteOS Compatibility Note', [
        'ATTENTION: For LiteOS with API versions earlier than HarmonyOS 2.0,',
        'the setPeerFingerPrint method is not available.',
        'Configure using config.json instead:'
    ]);

    printCodeBlock('   LiteOS config.json configuration', `
   "metaData": {
     "customizeData": [
       {
         "name": "supportLists",
         "value": "mobile:fingerprint",  // value length must be less than 255
         "extra": ""
       }
     ]
   }`);

    printSeparator();
    console.log('');
}

function run() {
    const { command, sourceFolderName, targetProjectName } = parseArgs();

    const workspacePath = process.cwd();
    const sourcePath = path.join(workspacePath, sourceFolderName);
    const targetPath = path.join(workspacePath, targetProjectName);

    if (!fs.existsSync(sourcePath)) {
        console.log(`Source not found!`);
        process.exit(1);
    }

    deleteBuildDir(sourcePath)
    copyDir(sourcePath, targetPath);
    updateBuildProfile(path.join(targetPath, 'build-profile.json5'), targetProjectName);

    const configPath = path.join(targetPath, 'entry/src/main/config.json');
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const normalized = normalizeConfig(config, targetProjectName, command);
        fs.writeFileSync(configPath, JSON.stringify(normalized, null, 4));
    }

    commentNativeDeps(path.join(targetPath, "entry", "src"));
    warnBigIntUsage(sourcePath);

    const usesWearEngine = detectWearEngineUsage(sourcePath);

    if (usesWearEngine) {
        console.log('');
        if (command === 'gen-smart') {
            showWearEngineWarningLiteToSmart();
        } else if (command === 'gen-lite') {
            showWearEngineWarningSmartToLite();
        }
    }

    console.log(`Successfully converted project ${targetProjectName} from ${sourceFolderName} and updated configurations`);
}

run();