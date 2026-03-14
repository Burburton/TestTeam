# Python Testing Skill

## Purpose

Guide for testing Python backend services.

## Testing Stack

- **pytest**: Test framework
- **pytest-asyncio**: Async test support
- **pytest-cov**: Coverage reporting
- **faker**: Test data generation
- **freezegun**: Time manipulation

## Test Structure

```
tests/
├── unit/
│   ├── test_services/
│   └── test_models/
├── integration/
│   ├── test_api/
│   └── test_database/
└── conftest.py
```

## Writing Tests

### Basic Test

```python
def test_create_user():
    user = User(name="test", email="test@example.com")
    assert user.name == "test"
    assert user.is_valid()
```

### Async Test

```python
@pytest.mark.asyncio
async def test_async_operation():
    result = await async_function()
    assert result is not None
```

### Fixture Usage

```python
@pytest.fixture
def mock_database():
    return MockDatabase()

def test_with_mock(mock_database):
    repo = UserRepository(mock_database)
    assert repo.find(1) is not None
```

## Coverage Requirements

- Minimum coverage: 80%
- Critical paths: 100%
- Run: `pytest --cov=src --cov-report=html`

## Common Patterns

### Mocking External Services

```python
from unittest.mock import patch, AsyncMock

@patch("module.external_api")
async def test_api_call(mock_api):
    mock_api.return_value = AsyncMock(return_value={"status": "ok"})
    result = await call_api()
    assert result["status"] == "ok"
```

### Database Testing

```python
@pytest.fixture
async def db_session():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield session
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
```