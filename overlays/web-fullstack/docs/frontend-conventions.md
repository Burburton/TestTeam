# Frontend Conventions

## Component Structure

```typescript
// Component file structure
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.styles.ts
│   └── index.ts
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile` |
| Hooks | use prefix | `useAuth` |
| Utils | camelCase | `formatDate` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| Types | PascalCase | `UserProps` |

## Component Template

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  onClick, 
  children 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## State Management

- Local state: `useState`
- Server state: React Query / SWR
- Global state: Zustand / Jotai

## Styling

- CSS Modules or Tailwind CSS
- Avoid inline styles
- Use consistent spacing scale

## Best Practices

1. Keep components under 100 lines
2. Extract reusable logic to hooks
3. Use TypeScript strict mode
4. Write tests for critical components
5. Document props with JSDoc