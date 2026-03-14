# Python Style Guide

## Code Style

This project follows PEP 8 with some modifications.

### Formatting Tools

- **Formatter**: Black (line length: 88)
- **Linter**: Ruff
- **Type Checker**: mypy
- **Import Sorter**: isort

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Modules | snake_case | `user_service.py` |
| Classes | PascalCase | `UserService` |
| Functions | snake_case | `get_user_by_id` |
| Variables | snake_case | `user_name` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Private | _prefix | `_internal_method` |

### Type Hints

```python
from typing import Optional, List

def get_user(user_id: int) -> Optional[User]:
    ...

def get_users() -> List[User]:
    ...
```

### Docstrings

```python
def calculate_total(items: List[Item]) -> float:
    """Calculate the total price of items.
    
    Args:
        items: List of items to sum.
        
    Returns:
        Total price including tax.
        
    Raises:
        ValueError: If items is empty.
    """
    ...
```

## Project Structure

```
src/
├── __init__.py
├── main.py
├── api/
│   ├── __init__.py
│   └── routes.py
├── services/
│   ├── __init__.py
│   └── user_service.py
└── models/
    ├── __init__.py
    └── user.py
```

## Best Practices

1. Use f-strings for string formatting
2. Prefer composition over inheritance
3. Use dataclasses for data containers
4. Keep functions under 30 lines
5. Write docstrings for public APIs