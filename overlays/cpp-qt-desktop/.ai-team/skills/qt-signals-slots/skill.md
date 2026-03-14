# Qt Signals & Slots Skill

## Purpose

Guide for implementing Qt signals and slots pattern in C++ applications.

## Best Practices

### Signal Declaration

```cpp
signals:
    void dataChanged(const QString& id);
    void statusUpdated(Status newStatus);
```

### Slot Declaration

```cpp
public slots:
    void onDataChanged(const QString& id);
    void handleStatusUpdate(Status newStatus);
```

### Connection Patterns

```cpp
// Old syntax (Qt 4/5 compatible)
connect(sender, SIGNAL(dataChanged(QString)), 
        receiver, SLOT(onDataChanged(QString)));

// New syntax (Qt 5+, preferred)
connect(sender, &Sender::dataChanged, 
        receiver, &Receiver::onDataChanged);

// Lambda connection
connect(sender, &Sender::dataChanged, this, [this](const QString& id) {
    handleDataChange(id);
});
```

## Common Mistakes to Avoid

1. **Missing Q_OBJECT macro** - Always include in class declaration
2. **Signal-slot signature mismatch** - Parameters must match exactly
3. **Dangling connections** - Use Qt::UniqueConnection when appropriate
4. **Blocking slots** - Avoid heavy operations in slots

## Testing Signals

```cpp
QSignalSpy spy(&object, &MyClass::dataChanged);
emit object.doSomething();
QCOMPARE(spy.count(), 1);
```

## Thread Safety

- Use `Qt::QueuedConnection` for cross-thread communication
- Avoid direct signal emission from worker threads to UI