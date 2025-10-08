import { useState } from "react";
import TaskItem from "./TaskItem";


export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");


  // 📘 TASK 4 — PART A (Anchor): Implement toggle using onMutateCourse + .map()
  function toggleTask(id) {
    if (!onMutateCourse) return;
    onMutateCourse(index, (tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  }


  // 📘 TASK 4 — PART A (Anchor): Implement delete using onMutateCourse + .filter()
  function deleteTask(id) {
    if (!onMutateCourse) return;
    onMutateCourse(index, (tasks) => tasks.filter((t) => t.id !== id));
  }


  // 📘 TASK 4 — PART A (Anchor): Implement add using onMutateCourse
  function addTask(e) {
    e.preventDefault();
    if (!onMutateCourse) return;
    const trimmed = title.trim();
    if (!trimmed) return; // don't add empty titles

    // generate a simple unique id
    const id = `t-${Date.now()}`;
    const newTask = { id, title: trimmed, dueDate: date || "", isDone: false };

    onMutateCourse(index, (tasks) => [...tasks, newTask]);

    // reset inputs
    setTitle("");
    setDate("");
  }


  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {/* 🟩 PART A (Anchor): Show "All caught up" badge when ALL tasks are done (logical &&) */}
        {course.tasks && course.tasks.length > 0 && course.tasks.every((t) => t.isDone) && (
          <span className="badge">All caught up</span>
        )}
      </header>


      {/* 🟩 PART A (Anchor): If NO tasks → show message; ELSE → render the list (ternary ?: ) */}
      <section className="tasksSection">
        {/* � PART A (Anchor): If NO tasks → show message; ELSE → render the list (ternary ?: ) */}
        {(!course.tasks || course.tasks.length === 0) ? (
          <p className="empty">No tasks yet. Add your first one below.</p>
        ) : (
          <ul className="tasks">
            {course.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        )}
      </section>


      {/* Add Form (provided) */}
      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
    </article>
  );
}