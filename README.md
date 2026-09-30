# BFSI Digital Banking Service

A sample digital banking backend service representing common BFSI application workflows such as customer lookup, authentication, transaction processing, service diagnostics, containerized deployment, and Kubernetes-based delivery.

## Overview

The project is structured to reflect a typical application delivery workflow used by engineering teams building and releasing financial-services software.

```text
Developer
   ↓
Source Repository
   ↓
CI/CD Pipeline
   ↓
Build & Package
   ↓
Container / Kubernetes Deployment
   ↓
Application Release
```

## Technology Stack

- Node.js
- Express.js
- SQLite
- JSON Web Tokens (JWT)
- Docker
- Kubernetes
- GitHub Actions
- CycloneDX SBOM

## Repository Structure

```text
.
├── .github/workflows/demo-ci.yml
├── config/application.yml
├── k8s/deployment.yaml
├── sbom/sbom.cdx.json
├── scripts/generate-sbom.sh
├── secrets/
├── src/app.js
├── Dockerfile
└── package.json
```

## Application Components

### Application Service

The Node.js service is located under:

```text
src/app.js
```

It exposes application endpoints used for customer and operational workflows.

### Application Configuration

Runtime configuration is maintained under:

```text
config/application.yml
```

### Containerization

The application can be packaged as a Docker container using the included:

```text
Dockerfile
```

Build the image with:

```bash
docker build -t bfsi-digital-banking-service:latest .
```

Run locally with:

```bash
docker run -p 3000:3000 bfsi-digital-banking-service:latest
```

### Kubernetes Deployment

A sample Kubernetes deployment manifest is available at:

```text
k8s/deployment.yaml
```

Apply it using:

```bash
kubectl apply -f k8s/deployment.yaml
```

## Software Bill of Materials

A CycloneDX software bill of materials is maintained under:

```text
sbom/sbom.cdx.json
```

A fresh SBOM can be generated with:

```bash
./scripts/generate-sbom.sh
```

or directly with Syft:

```bash
syft dir:. -o cyclonedx-json=sbom/sbom.cdx.json
```

The SBOM provides an inventory of software packages and dependencies included in the application release.

## CI/CD

The repository includes a GitHub Actions workflow at:

```text
.github/workflows/demo-ci.yml
```

The workflow represents a standard application build and software-delivery pipeline and can be extended with organization-specific validation and release controls.

## Running Locally

### Prerequisites

- Node.js
- npm

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

The service listens on:

```text
http://localhost:3000
```

## Release Workflow

A typical release lifecycle for this project is:

```text
Code Change
    ↓
Pull Request
    ↓
Build & Validation
    ↓
Application Package
    ↓
SBOM Generation
    ↓
Container Image
    ↓
Deployment
    ↓
Release
```

## Usage

This repository is intended for controlled development, integration, validation, and demonstration environments. Configuration values included in the repository are for non-production use only.
