---
name: react-js
description: A comprehensive guide and reference for React.js, covering core hooks, component APIs, and modern patterns.
---

# React Documentation

React is a JavaScript library for building user interfaces. It lets you create reusable UI components that manage their own state and compose them to build complex applications. React uses a declarative approach where you describe what your UI should look like, and React efficiently updates the DOM when your data changes.

The core of React centers around components and hooks. Components are independent, reusable pieces of UI that can be composed together. Hooks are functions that let you use React features like state and lifecycle methods in functional components. React 19 introduces new features including improved context providers, the `use` hook for reading resources, and automatic memoization through React Compiler.

## Hooks API

### useState

`useState` is a React Hook that lets you add a state variable to your component. It returns an array with two elements: the current state value and a function to update it.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'Taylor', age: 42 });

  function handleIncrement() {
    // Update with new value
    setCount(count + 1);

    // Or use updater function for state based on previous state
    setCount(prevCount => prevCount + 1);
  }

  function handleUpdateUser() {
    // For objects, create a new object with spread operator
    setUser({ ...user, age: user.age + 1 });
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <p>User: {user.name}, Age: {user.age}</p>
      <button onClick={handleUpdateUser}>Birthday</button>
    </div>
  );
}
```

### useEffect

`useEffect` is a React Hook that lets you synchronize a component with external systems like APIs, DOM manipulation, or subscriptions. It runs after render and can optionally clean up before the component unmounts.

```jsx
import { useState, useEffect } from 'react';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Setup: connect to chat room
    const connection = createConnection(roomId);
    connection.connect();

    connection.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Cleanup: disconnect when roomId changes or component unmounts
    return () => {
      connection.disconnect();
    };
  }, [roomId]); // Re-run effect when roomId changes

  return (
    <ul>
      {messages.map((msg, i) => (
        <li key={i}>{msg}</li>
      ))}
    </ul>
  );
}

// Effect that runs only on mount
function Logger() {
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
  }, []); // Empty array = run only on mount/unmount

  return <div>Check console for logs</div>;
}
```

### useContext

`useContext` is a React Hook that lets you read and subscribe to context from your component. Context provides a way to pass data through the component tree without having to pass props manually at every level.

```jsx
import { createContext, useContext, useState } from 'react';

// Create a context with default value
const ThemeContext = createContext('light');
const UserContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState({ name: 'Taylor' });

  return (
    // Provide context values to all children
    <ThemeContext value={theme}>
      <UserContext value={{ user, setUser }}>
        <Page />
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Toggle Theme
        </button>
      </UserContext>
    </ThemeContext>
  );
}

function Page() {
  return (
    <div>
      <Panel />
      <ProfileButton />
    </div>
  );
}

function Panel() {
  // Read theme from context - re-renders when theme changes
  const theme = useContext(ThemeContext);
  return <div className={`panel-${theme}`}>Current theme: {theme}</div>;
}

function ProfileButton() {
  // Read user context including setter function
  const { user, setUser } = useContext(UserContext);
  return (
    <button onClick={() => setUser({ name: 'New User' })}>
      Logged in as: {user.name}
    </button>
  );
}
```

### useRef

`useRef` is a React Hook that lets you reference a value that's not needed for rendering. It's commonly used to access DOM elements directly or to persist values across renders without triggering re-renders.

```jsx
import { useRef, useState } from 'react';

function TextInputWithFocus() {
  const inputRef = useRef(null);

  function handleClick() {
    // Access DOM node directly
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = '#ffffcc';
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}

function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null); // Persist interval ID across renders

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  const secondsPassed = startTime && now ? (now - startTime) / 1000 : 0;

  return (
    <>
      <h1>Time: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}
```

### useReducer

`useReducer` is a React Hook that lets you add a reducer to your component for managing complex state logic. It's similar to useState but gives you more control over state updates through a reducer function.

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age':
      return { ...state, age: state.age + 1 };
    case 'changed_name':
      return { ...state, name: action.nextName };
    case 'reset':
      return { name: '', age: 0 };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    });
  }

  return (
    <>
      <input
        value={state.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <button onClick={() => dispatch({ type: 'incremented_age' })}>
        Increment age
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
      <p>Hello, {state.name}. You are {state.age}.</p>
    </>
  );
}
```

### useMemo

`useMemo` is a React Hook that lets you cache the result of a calculation between re-renders. It only recalculates when one of the dependencies changes.

```jsx
import { useMemo, useState } from 'react';

function TodoList({ todos, tab, theme }) {
  // Only recalculate when todos or tab changes, not when theme changes
  const visibleTodos = useMemo(() => {
    console.log('Filtering todos...');
    return filterTodos(todos, tab);
  }, [todos, tab]);

  // Cache expensive computation
  const sortedTodos = useMemo(() => {
    return [...visibleTodos].sort((a, b) => a.text.localeCompare(b.text));
  }, [visibleTodos]);

  return (
    <div className={theme}>
      <ul>
        {sortedTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

function filterTodos(todos, tab) {
  return todos.filter(todo => {
    if (tab === 'all') return true;
    if (tab === 'active') return !todo.completed;
    if (tab === 'completed') return todo.completed;
  });
}
```

### useCallback

`useCallback` is a React Hook that lets you cache a function definition between re-renders. It's useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.

```jsx
import { useCallback, useState, memo } from 'react';

function ProductPage({ productId, referrer }) {
  const [count, setCount] = useState(0);

  // Cache function so ShippingForm doesn't re-render unnecessarily
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

// Memoized component only re-renders if props change
const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  console.log('ShippingForm rendered');
  const [address, setAddress] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ address });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <button type="submit">Submit</button>
    </form>
  );
});
```

## Components API

### memo

`memo` lets you skip re-rendering a component when its props are unchanged. Wrap a component in memo to get a memoized version that only re-renders when props change.

```jsx
import { memo, useState } from 'react';

const Greeting = memo(function Greeting({ name }) {
  console.log('Greeting rendered at', new Date().toLocaleTimeString());
  return <h3>Hello, {name}!</h3>;
});

// Custom comparison function
const Chart = memo(function Chart({ data, options }) {
  // Expensive rendering logic
  return <canvas>{/* chart rendering */}</canvas>;
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return prevProps.data.length === nextProps.data.length &&
         prevProps.options.color === nextProps.options.color;
});

function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
      {/* Greeting only re-renders when name changes, not address */}
      <Greeting name={name} />
    </>
  );
}
```

### Suspense

`Suspense` lets you display a fallback while its children are loading. It works with lazy-loaded components, data fetching with the `use` hook, and any component that "suspends."

```jsx
import { Suspense, lazy, useState } from 'react';

// Lazy load component - code splits here
const HeavyComponent = lazy(() => import('./HeavyComponent.js'));
const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

function App() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
      <h1>My App</h1>

      {/* Show loading spinner while HeavyComponent loads */}
      <Suspense fallback={<div>Loading main content...</div>}>
        <HeavyComponent />
      </Suspense>

      <button onClick={() => setShowPreview(!showPreview)}>
        Toggle Preview
      </button>

      {showPreview && (
        <Suspense fallback={<LoadingSpinner />}>
          <MarkdownPreview content="# Hello World" />
        </Suspense>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return <div className="spinner">Loading...</div>;
}

// Nested Suspense boundaries for granular loading states
function Dashboard() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
    </Suspense>
  );
}
```

### createContext

`createContext` lets you create a context that components can provide or read. It returns a context object that can be used with useContext hook.

```jsx
import { createContext, useContext, useState } from 'react';

// Create contexts with default values
const ThemeContext = createContext('light');
const AuthContext = createContext(null);

// contexts.js - Export contexts for use across files
export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);

// App.js - Provide context values
function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  return (
    <ThemeContext value={theme}>
      <AuthContext value={{ user, login: setUser, logout: () => setUser(null) }}>
        <Router />
      </AuthContext>
    </ThemeContext>
  );
}

// Any nested component can consume context
function ThemedButton() {
  const theme = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <button className={`btn-${theme}`} onClick={logout}>
      {user ? `Logout ${user.name}` : 'Not logged in'}
    </button>
  );
}

// Provider pattern with custom hook
const CountContext = createContext(null);

export function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext value={{ count, setCount }}>
      {children}
    </CountContext>
  );
}

export function useCount() {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within CountProvider');
  }
  return context;
}
```

### lazy

`lazy` lets you defer loading a component's code until it is rendered for the first time. This enables code splitting to reduce initial bundle size.

```jsx
import { lazy, Suspense, useState } from 'react';

// Component is loaded only when first rendered
const AdminPanel = lazy(() => import('./AdminPanel.js'));
const UserDashboard = lazy(() => import('./UserDashboard.js'));
const Settings = lazy(() => import('./Settings.js'));

function App() {
  const [page, setPage] = useState('home');

  return (
    <div>
      <nav>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('admin')}>Admin</button>
        <button onClick={() => setPage('settings')}>Settings</button>
      </nav>

      <Suspense fallback={<div>Loading page...</div>}>
        {page === 'home' && <UserDashboard />}
        {page === 'admin' && <AdminPanel />}
        {page === 'settings' && <Settings />}
      </Suspense>
    </div>
  );
}

// Route-based code splitting
const routes = {
  '/': lazy(() => import('./pages/Home.js')),
  '/about': lazy(() => import('./pages/About.js')),
  '/contact': lazy(() => import('./pages/Contact.js')),
};

function Router() {
  const [path, setPath] = useState('/');
  const Page = routes[path] || routes['/'];

  return (
    <Suspense fallback={<PageLoader />}>
      <Page navigate={setPath} />
    </Suspense>
  );
}
```

## React DOM API

### createRoot

`createRoot` creates a React root for displaying components in a browser DOM node. This is the entry point for rendering a React application.

```jsx
import { createRoot } from 'react-dom/client';
import App from './App.js';

// Basic usage - render entire app
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// With error handling options
const root = createRoot(document.getElementById('root'), {
  onCaughtError: (error, errorInfo) => {
    console.error('Caught error:', error);
    console.log('Component stack:', errorInfo.componentStack);
    // Send to error reporting service
    logErrorToService(error, errorInfo);
  },
  onUncaughtError: (error, errorInfo) => {
    console.error('Uncaught error:', error);
    // Show error UI
    showErrorOverlay(error);
  },
  onRecoverableError: (error, errorInfo) => {
    console.warn('Recoverable error:', error);
  }
});
root.render(<App />);

// Multiple roots for "islands" of React in a page
const headerRoot = createRoot(document.getElementById('header'));
headerRoot.render(<Header />);

const sidebarRoot = createRoot(document.getElementById('sidebar'));
sidebarRoot.render(<Sidebar />);

// Unmounting
function cleanup() {
  root.unmount(); // Removes React from the DOM node
}

// Re-rendering with new props (rarely needed)
function updateApp(newProps) {
  root.render(<App {...newProps} />);
}
```

## Summary

React provides a comprehensive set of tools for building modern user interfaces. The hooks API (useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback) enables functional components to manage state, side effects, and performance optimizations. Components like Suspense and memo work together with lazy loading to create performant applications with great user experiences during loading states.

The typical React application pattern involves creating a component hierarchy, managing local state with useState or useReducer, sharing global state through context, and optimizing renders with memo and useMemo. For data fetching, useEffect handles side effects while Suspense provides declarative loading states. The createRoot API from react-dom/client initializes the React application in the browser, supporting features like error boundaries and multiple independent roots for micro-frontend architectures.
