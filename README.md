# BFSI Digital Banking Service — ASPM Demo

> **Purpose:** intentionally vulnerable, non-production repository for authorized ASPM demonstrations. Do **not** expose this application to the Internet.

This repository models a small BFSI account/transaction application that is approaching a software security-clearance process. It contains intentionally planted findings across source code, open-source dependencies, credentials, containers, Kubernetes, and CI/CD so an ASPM platform can demonstrate an end-to-end application security story.

## Primary demo story

```text
Developer Commit
      ↓
Source + Dependencies + IaC + CI/CD
      ↓
┌────────┬────────┬─────────┬─────────┐
│  SBOM  │  SCA   │  SAST   │ Secrets │
└────────┴────────┴─────────┴─────────┘
      ↓
ASPM Correlation & Prioritization
      ↓
Ownership / SLA / Remediation / Policy
      ↓
X Security Clearance
      ↓
BFSI Customer Release
```

The positioning is intentional: **ASPM complements X's existing security-clearance process; it does not replace X as the decision authority.**

## What this repository demonstrates

### 1. SBOM — Software Bill of Materials
Inventory the software ingredients inside a release. A sample CycloneDX SBOM is committed at:

```text
sbom/sbom.cdx.json
```

Generate a fresh SBOM with Syft:

```bash
syft dir:. -o cyclonedx-json=sbom/sbom.cdx.json
```

or:

```bash
./scripts/generate-sbom.sh
```

**Demo message:** SBOM answers *what is inside the application*. SCA answers *which of those components are risky*.

### 2. SCA — Software Composition Analysis
`package.json` intentionally references older dependency versions so an SCA scanner can identify known dependency risk and remediation versions.

Examples include:

- axios `0.21.1`
- express `4.17.1`
- jsonwebtoken `8.5.1`
- lodash `4.17.20`
- moment `2.29.1`
- sqlite3 `5.0.0`

Use your ASPM platform's SCA integration for the customer demo. A standalone local example is:

```bash
trivy fs --scanners vuln .
```

### 3. SAST
`src/app.js` intentionally contains patterns such as:

- SQL query construction using untrusted input
- OS command execution using request data
- weak MD5 hashing
- static application credentials
- hard-coded JWT signing material
- sensitive debug/configuration exposure

The goal is to demonstrate **finding → source location → application → owner → remediation** rather than only a finding count.

### 4. Secret scanning
`secrets/`, source code, and configuration contain realistic-looking but **non-functional demo credentials** so secret scanners have meaningful patterns to detect.

> Never replace them with live credentials. Public Git repositories can be continuously harvested for exposed credentials.

Example standalone scan:

```bash
trufflehog filesystem . --no-update
```

### 5. IaC / Container / CI-CD posture
The repository also includes deliberately risky configuration such as:

- privileged Kubernetes execution
- root container execution
- plaintext secret-like configuration
- older runtime/base image
- excessive GitHub Actions repository permission

This lets the presentation transition naturally from AppSec scanners into the broader ASPM view.

## Recommended live demo order

1. Present this repository as software approaching X security clearance.
2. Show **SBOM** first: application → component → version inventory.
3. Show **SCA**: vulnerable component → CVE/risk → affected/fixed version.
4. Show **SAST**: vulnerability → exact source location → remediation context.
5. Show **Secrets**: credential finding → repository/path → remediation.
6. Show **IaC / Container / CI-CD** findings.
7. Switch to the **ASPM application view** and correlate everything under one application.
8. Demonstrate prioritization, ownership, SLA, suppression/exception handling, ticketing, trends, and CI/CD policy/gating where available.
9. Finish with the X operating model: ASPM provides continuous evidence; **X retains security-clearance ownership** and can extend that assurance to its BFSI customers.

See:

- `docs/demo-script.md`
- `docs/sbom-demo.md`
- `docs/x-aspm-partner-demo.drawio`

## Repository structure

```text
.
├── .github/workflows/demo-ci.yml
├── config/application.yml
├── docs/
│   ├── demo-script.md
│   ├── sbom-demo.md
│   └── x-aspm-partner-demo.drawio
├── k8s/deployment.yaml
├── sbom/sbom.cdx.json
├── scripts/generate-sbom.sh
├── secrets/
│   ├── demo-private-key.pem
│   └── demo-secrets.env
├── src/app.js
├── Dockerfile
└── package.json
```

## Running locally

```bash
npm install
npm start
```

The application listens on port `3000`.

## Safety

This repository is intentionally insecure and is only for controlled demonstrations and authorized security testing. All included secrets are fake/non-functional. Do not deploy it to a public environment.
