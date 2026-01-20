import TaskInput from './components/TaskInput';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import './App.css'; // We'll keep index.css as the main one, but App.css can exist too

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 ClearTax Task Manager</h1>
      </header>

      <main>
        <TaskInput />
        <TaskFilter />
        <TaskList />
      </main>

      <footer style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.75rem', color: '#718096' }}>
        Built with React Context + useReducer + useRef
      </footer>
    </div>
  );
}

export default App;
