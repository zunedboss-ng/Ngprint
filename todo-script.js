// Todo List Application with Local Storage
class TodoApp {
    constructor() {
        this.todos = this.loadFromStorage();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add button click
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());

        // Enter key to add todo
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Clear all completed button
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearCompleted());

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active', 'bg-purple-600', 'text-white');
                    b.classList.add('bg-gray-200', 'text-gray-700');
                });
                e.target.closest('.filter-btn').classList.add('active', 'bg-purple-600', 'text-white');
                e.target.closest('.filter-btn').classList.remove('bg-gray-200', 'text-gray-700');
                this.currentFilter = e.target.closest('.filter-btn').getAttribute('data-filter');
                this.render();
            });
        });
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const priority = document.getElementById('prioritySelect').value;
        const text = input.value.trim();

        if (text === '') {
            this.showNotification('Please enter a task!', 'warning');
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: priority,
            createdAt: new Date().toLocaleDateString(),
            dueDate: null
        };

        this.todos.push(newTodo);
        this.saveToStorage();
        input.value = '';
        input.focus();
        document.getElementById('prioritySelect').value = 'medium';
        this.render();
        this.showNotification('Task added successfully!', 'success');
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToStorage();
        this.render();
        this.showNotification('Task deleted!', 'info');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newText = prompt('Edit your task:', todo.text);
        if (newText && newText.trim() !== '') {
            todo.text = newText.trim();
            this.saveToStorage();
            this.render();
            this.showNotification('Task updated!', 'success');
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear!', 'warning');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveToStorage();
            this.render();
            this.showNotification('Completed tasks cleared!', 'success');
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'high':
                return this.todos.filter(t => t.priority === 'high');
            default:
                return this.todos;
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('pendingCount').textContent = pending;
    }

    render() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();

        this.updateStats();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-${this.currentFilter === 'completed' ? 'check-circle' : this.currentFilter === 'active' ? 'tasks' : 'inbox'}"></i>
                    <p class="text-lg">
                        ${this.currentFilter === 'completed' ? 'No completed tasks yet' :
                          this.currentFilter === 'active' ? 'All tasks completed! 🎉' :
                          this.currentFilter === 'high' ? 'No high priority tasks' :
                          'No tasks yet. Add one to get started!'}
                    </p>
                </div>
            `;
            return;
        }

        todoList.innerHTML = filteredTodos.map(todo => this.createTodoElement(todo)).join('');

        // Attach event listeners to the rendered elements
        document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTodo(parseInt(e.target.dataset.id));
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.deleteTodo(parseInt(e.target.dataset.id));
            });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.editTodo(parseInt(e.target.dataset.id));
            });
        });
    }

    createTodoElement(todo) {
        const priorityClass = `priority-${todo.priority}`;
        const completedClass = todo.completed ? 'completed' : '';

        return `
            <div class="todo-item ${completedClass} bg-white border-l-4 border-${this.getPriorityColor(todo.priority)} rounded-lg p-4 mb-3 flex items-center justify-between hover:shadow-md">
                <div class="flex items-center flex-1 gap-4">
                    <input 
                        type="checkbox" 
                        class="todo-checkbox w-5 h-5 rounded cursor-pointer"
                        data-id="${todo.id}"
                        ${todo.completed ? 'checked' : ''}
                    >
                    <div class="flex-1">
                        <p class="todo-text text-gray-800 font-medium">${this.escapeHtml(todo.text)}</p>
                        <div class="flex gap-2 mt-2 flex-wrap">
                            <span class="priority-badge ${priorityClass}">
                                ${this.getPriorityIcon(todo.priority)} ${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                            </span>
                            <span class="text-xs text-gray-500">
                                <i class="fas fa-calendar mr-1"></i>${todo.createdAt}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button 
                        class="edit-btn bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-2 px-3 rounded-lg transition btn-transition"
                        data-id="${todo.id}"
                        title="Edit task"
                    >
                        <i class="fas fa-edit"></i>
                    </button>
                    <button 
                        class="delete-btn bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-3 rounded-lg transition btn-transition"
                        data-id="${todo.id}"
                        title="Delete task"
                    >
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    getPriorityColor(priority) {
        const colors = {
            high: 'red-500',
            medium: 'yellow-500',
            low: 'blue-500'
        };
        return colors[priority] || colors.medium;
    }

    getPriorityIcon(priority) {
        const icons = {
            high: '🔴',
            medium: '🟡',
            low: '🔵'
        };
        return icons[priority] || '🟡';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        const colors = {
            success: 'bg-green-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500',
            error: 'bg-red-500'
        };

        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-circle' : type === 'error' ? 'times-circle' : 'info-circle'} mr-2"></i>
            ${message}
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    saveToStorage() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            this.showNotification('Error saving tasks', 'error');
        }
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem('todos');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return [];
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});