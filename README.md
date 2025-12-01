> **Note:** To access all shared projects, get information about environment setup, and view other guides, please visit [Explore-In-HMOS-Wearable Index](https://github.com/Explore-In-HMOS-Wearable/hmos-index).

# Huawei Wearable Adapter Solution

## Overview

This project simplifies cross-platform development for Huawei Smart Wearable and Lite Wearable devices by providing a
unified development experience.

## Getting Started

Please refer to [Getting Started document](/getting-started.md).

## Problem Statement

Developing for both Huawei Smart Wearable and Lite Wearable platforms presents several challenges:

- **Inconsistent Library Structure**: Some libraries are identical across platforms, while others differ
- **Varying Method Signatures**: The same functionality may require different argument orders or parameter types
  depending on the platform

## Solution

Our adapter solution addresses these challenges through two key components:

### 1. Unified Wrapper Libraries

We provide wrapper libraries that abstract away platform-specific differences, offering:

- A single, consistent API for both platforms
- Standardized method calls and arguments
- Reduced code duplication

### 2. Project Generator Script

An intelligent generator that automatically converts projects between platforms:

- Converts Lite Wearable projects to Smart Wearable JS projects (and vice versa)
- Handles necessary configuration changes
- Reorganizes file structure according to target platform requirements
- Outputs a fully functional project for the target platform

## Limitations

This solution focuses on **common features** available across both platforms. Platform-specific APIs that exist only on
Smart Wearable or only on Lite Wearable devices are not supported through the adapter.

This project currently supports **Smart Wearable JS projects only**. ArkTS projects are not supported at this time.

## LICENSE

This project is distributed under the terms of the MIT License.
See the [LICENSE](/LICENSE) for more information.
