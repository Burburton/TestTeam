# LLM Integration Skill

## Purpose

Guide for integrating Large Language Models into applications.

## Framework Choice

- **LangChain**: Full-featured LLM framework
- **LlamaIndex**: RAG-focused
- **Direct API**: OpenAI/Anthropic SDKs

## Basic Integration

```python
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

llm = ChatOpenAI(model="gpt-4", temperature=0.7)

response = llm.invoke([
    SystemMessage(content="You are a helpful assistant."),
    HumanMessage(content="Hello!")
])
```

## Prompt Engineering

### System Prompts

```python
SYSTEM_PROMPT = """You are an expert code reviewer.
Analyze code for:
- Security vulnerabilities
- Performance issues
- Best practice violations

Respond in JSON format."""
```

### Few-Shot Examples

```python
examples = [
    {"input": "def add(a, b): return a + b", 
     "output": "Valid: Simple addition function"},
    {"input": "eval(user_input)", 
     "output": "Critical: Code injection risk"},
]
```

## RAG Patterns

### Vector Store Integration

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(documents, embeddings)

results = vectorstore.similarity_search(query, k=4)
```

### Retrieval Chain

```python
from langchain.chains import RetrievalQA

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(),
    return_source_documents=True
)
```

## Cost Optimization

1. Use smaller models for simple tasks
2. Implement caching for repeated queries
3. Batch requests when possible
4. Monitor token usage

## Error Handling

```python
from openai import RateLimitError, APIError

try:
    response = llm.invoke(messages)
except RateLimitError:
    # Implement backoff retry
    time.sleep(60)
    response = llm.invoke(messages)
except APIError as e:
    logger.error(f"API Error: {e}")
    raise
```