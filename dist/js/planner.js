/**
 * COS 106 Academic Planner System
 * - Interactive task management: Add, Toggle Complete, Delete
 * - Strict DOM manipulation, event handling, arrays and functions
 * - Filters: All, Pending, Completed, High Priority
 * - Live dynamic counters & progress percentage
 * - LocalStorage persistence
 */

const STORAGE_KEY = 'cos106_academic_tasks_v1';

const DEFAULT_TASKS = [
  {
    id: 1,
    title: 'Complete COS 106 Term Project Portfolio Website',
    course: 'COS 106',
    dueDate: '2026-11-15',
    priority: 'High',
    completed: true
  },
  {
    id: 2,
    title: 'Review Cyber Defense Architecture & Network Models',
    course: 'CYB 101',
    dueDate: '2026-11-20',
    priority: 'High',
    completed: false
  },
  {
    id: 3,
    title: 'Validate HTML Semantic Tags and WCAG 2.1 Accessibility',
    course: 'COS 106',
    dueDate: '2026-11-22',
    priority: 'Medium',
    completed: false
  },
  {
    id: 4,
    title: 'Corporate Systems Audit Log Analysis Practicum',
    course: 'SYS 104',
    dueDate: '2026-11-28',
    priority: 'Low',
    completed: false
  }
];

class AcademicPlanner {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentFilter = 'all';
    this.initDOMElements();
    this.attachEventListeners();
    this.render();
  }

  loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load tasks from localStorage', e);
    }
    return [...DEFAULT_TASKS];
  }

  saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (e) {
      console.error('Error saving tasks to localStorage', e);
    }
  }

  initDOMElements() {
    this.taskForm = document.getElementById('plannerTaskForm');
    this.taskTitleInput = document.getElementById('taskTitleInput');
    this.taskCourseInput = document.getElementById('taskCourseInput');
    this.taskDueDateInput = document.getElementById('taskDueDateInput');
    this.taskPriorityInput = document.getElementById('taskPriorityInput');
    this.taskListContainer = document.getElementById('plannerTaskList');

    // Stats
    this.statTotal = document.getElementById('statTotalTasks');
    this.statCompleted = document.getElementById('statCompletedTasks');
    this.statPending = document.getElementById('statPendingTasks');
    this.statRate = document.getElementById('statCompletionRate');

    // Filters
    this.filterButtons = document.querySelectorAll('.filter-btn');
  }

  attachEventListeners() {
    if (this.taskForm) {
      this.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));
    }

    if (this.taskListContainer) {
      this.taskListContainer.addEventListener('click', (e) => this.handleListActions(e));
    }

    if (this.filterButtons) {
      this.filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentFilter = btn.dataset.filter || 'all';
          this.renderList();
        });
      });
    }
  }

  handleAddTask(e) {
    e.preventDefault();
    const title = this.taskTitleInput?.value.trim();
    const course = this.taskCourseInput?.value.trim() || 'COS 106';
    const dueDate = this.taskDueDateInput?.value || new Date().toISOString().split('T')[0];
    const priority = this.taskPriorityInput?.value || 'Medium';

    if (!title) {
      this.taskTitleInput?.focus();
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      course,
      dueDate,
      priority,
      completed: false
    };

    this.tasks.unshift(newTask);
    this.saveTasks();
    this.render();

    if (this.taskTitleInput) this.taskTitleInput.value = '';
    if (this.taskCourseInput) this.taskCourseInput.value = 'COS 106';
    if (this.taskTitleInput) this.taskTitleInput.focus();
  }

  handleListActions(e) {
    const toggleTarget = e.target.closest('[data-action="toggle"]');
    const deleteTarget = e.target.closest('[data-action="delete"]');

    if (toggleTarget) {
      const taskId = Number(toggleTarget.dataset.id);
      this.toggleTaskCompletion(taskId);
    } else if (deleteTarget) {
      const taskId = Number(deleteTarget.dataset.id);
      this.deleteTask(taskId);
    }
  }

  toggleTaskCompletion(taskId) {
    this.tasks = this.tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    this.saveTasks();
    this.render();
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.saveTasks();
    this.render();
  }

  getFilteredTasks() {
    switch (this.currentFilter) {
      case 'completed':
        return this.tasks.filter(t => t.completed);
      case 'pending':
        return this.tasks.filter(t => !t.completed);
      case 'high':
        return this.tasks.filter(t => t.priority.toLowerCase() === 'high');
      default:
        return this.tasks;
    }
  }

  renderStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (this.statTotal) this.statTotal.textContent = total;
    if (this.statCompleted) this.statCompleted.textContent = completed;
    if (this.statPending) this.statPending.textContent = pending;
    if (this.statRate) this.statRate.textContent = `${rate}%`;
  }

  renderList() {
    if (!this.taskListContainer) return;
    const visibleTasks = this.getFilteredTasks();

    if (visibleTasks.length === 0) {
      this.taskListContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--c-text-muted); font-size: 0.95rem;">
          <p>No academic tasks found under filter "${this.currentFilter}". 📭</p>
        </div>
      `;
      return;
    }

    this.taskListContainer.innerHTML = visibleTasks.map(task => {
      const prioEmoji = task.priority.toLowerCase() === 'high' ? '🔴' : (task.priority.toLowerCase() === 'medium' ? '🟡' : '🟢');
      return `
        <article class="task-card ${task.completed ? 'is-done' : ''}" data-id="${task.id}">
          <div style="display: flex; align-items: center; gap: 0.85rem; flex-grow: 1;">
            <button type="button" class="check-btn" data-action="toggle" data-id="${task.id}" aria-label="${task.completed ? 'Mark task as pending' : 'Mark task as completed'}">
              ${task.completed ? '✔' : ''}
            </button>
            <div>
              <h4 class="task-title" style="font-size: 0.95rem; font-weight: 600; color: var(--c-text);">${this.escapeHTML(task.title)}</h4>
              <div class="task-meta">
                <span class="tag">${this.escapeHTML(task.course)}</span>
                <span>${prioEmoji} ${this.escapeHTML(task.priority)}</span>
                <time datetime="${task.dueDate}">📅 Due: ${this.escapeHTML(task.dueDate)}</time>
              </div>
            </div>
          </div>
          <button type="button" class="del-btn" data-action="delete" data-id="${task.id}" aria-label="Delete task: ${this.escapeHTML(task.title)}" title="Delete Task">
            🗑️
          </button>
        </article>
      `;
    }).join('');
  }

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  render() {
    this.renderStats();
    this.renderList();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('plannerTaskList')) {
    window.academicPlanner = new AcademicPlanner();
  }
});
