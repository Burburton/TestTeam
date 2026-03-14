# Qt Coding Conventions

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Classes | PascalCase | `MainWindow` |
| Functions | camelCase | `calculateTotal()` |
| Variables | camelCase | `userName` |
| Constants | camelCase | `maxRetryCount` |
| Member variables | m_ prefix | `m_userName` |
| Signals | camelCase | `dataChanged()` |
| Slots | camelCase | `onDataChanged()` |

## File Organization

```
src/
├── main.cpp
├── mainwindow.h
├── mainwindow.cpp
├── models/
│   ├── usermodel.h
│   └── usermodel.cpp
└── widgets/
    ├── customwidget.h
    └── customwidget.cpp
```

## Header Guards

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

// ... declarations

#endif // MAINWINDOW_H
```

## Memory Management

- Parent-child ownership for QObjects
- Use `std::unique_ptr` for non-QObject types
- Avoid raw pointers for ownership

## Signal-Slot Connections

```cpp
// Preferred: New syntax
connect(sender, &Sender::signal, receiver, &Receiver::slot);

// With lambda
connect(button, &QPushButton::clicked, this, [this]() {
    handleClick();
});
```

## Best Practices

1. Use Qt's property system for QML integration
2. Prefer `QString` over `std::string`
3. Use Qt's container classes for Qt integration
4. Enable Qt's memory debugger in debug builds