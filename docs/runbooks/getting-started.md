# Getting Started

## Prerequisites

- Node.js 20+
- npm or yarn
- Git
- GitHub account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/amazingteam.git
cd amazingteam
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment:
```bash
cp .env.example .env
```

## Usage

### Creating an Issue

1. Go to Issues → New Issue
2. Select a template (Feature, Bug, Tech Task)
3. Fill in the required fields
4. The AI team will automatically analyze the issue

### Triggering AI Work

Comment on an issue:
```
/opencode use architect to analyze this issue
```

Available commands:
- `/design` - Analyze and design
- `/implement` - Implement changes
- `/test` - Run tests
- `/review` - Review code

### Workflow

1. Create an issue with the template
2. AI Architect analyzes and designs
3. AI Developer implements
4. AI QA validates
5. AI Reviewer reviews
6. Human approves and merges

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## Configuration

See `.opencode/opencode.jsonc` for AI configuration.