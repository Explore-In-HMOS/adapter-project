## Getting Started

### Prerequisites

- DevEco Studio installed
- Basic familiarity with Huawei Wearable development

### Quick Start Guide

We recommend starting with a **Lite Wearable project** and generating the Smart Wearable version from it.

#### Step 1: Download the HAR Libraries

Download the adapter HAR libraries:
- [Download Latest Release](/hars/)

The package includes unified wrapper libraries for common Huawei Wearable APIs.

#### Step 2: Create a Lite Wearable Project

1. Create a new **Lite Wearable** project in DevEco Studio
2. Copy the downloaded HAR files into your project directory
3. Add the libraries as dependencies in your `oh-package.json5`:
```json
{
  "dependencies": {
    "@hwbundle/storage": "file:./hars/storage.har"
  }
}
```

#### Step 3: Develop Your Application

Use the unified adapter APIs in your code instead of platform-specific APIs. The adapter libraries handle all platform differences automatically.

Example:
```javascript
import { brightness } from '@hwbundle/brightness';

// Works on both platforms with consistent behavior
brightness.setValue({ value: 10 });
```

#### Step 4: Generate Smart Wearable Project

Once your Lite Wearable project is ready, use our generator script to create the Smart Wearable version.

**Important:**
The generator script must be placed **in the parent folder**, not inside the Lite project itself.

Your directory should look like this before running the script:

```
/workspace/
├── generator.js
└── lite-app/
```

1. Place the `generator.js` file in the parent directory
2. Run the following command in your terminal:

```bash
node generator.js gen-smart lite-app smart-app
```

Where:

* `lite-app` is your Lite Wearable project folder name
* `smart-app` is the name for the generated Smart Wearable project

The script will automatically:

* Copy your project structure
* Update all necessary configurations
* Generate a ready-to-run Smart Wearable JS project

### Project Structure

After generation, you'll have:
```
/workspace/
├── generator.js        # Generator script
├── lite-app/           # Lite Wearable project
├── smart-app/          # Smart Wearable JS project
```
