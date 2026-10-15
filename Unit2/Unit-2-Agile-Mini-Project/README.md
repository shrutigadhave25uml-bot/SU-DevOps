# CampusFlow — Student Record and Academic Management Platform

An educational Agile mini-project based on the Unit 2 brief. CampusFlow is a responsive front-end prototype for managing student records, courses, attendance, marks, and simple academic reports.

## Features
- Dashboard with student, course, attendance and marks summaries
- Student management: add, search, edit and delete
- Course catalogue: add and delete courses
- Attendance register with date selection and Present / Absent / Late statuses
- Marks entry with percentage and grade calculation
- Academic performance report and CSV export
- Browser `localStorage` persistence
- Responsive desktop and mobile layout

## Technology
- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage (no server or database required)

## Run the project
1. Extract the ZIP.
2. Open the `Unit-2-Agile-Mini-Project` folder in Visual Studio Code.
3. Open `index.html` in a browser. Recommended: use the VS Code Live Server extension and click **Go Live**.
4. Use the navigation on the left to explore modules.

No build tools or package installation are required.

## Demo limitations
This is a learning prototype, not a production student information system. It has no real login/authentication, server-side database, multi-user synchronization, password reset, or role-based access control. Data remains in the browser profile where it was entered. Do not enter real student personal data.

## Project structure
```text
Unit-2-Agile-Mini-Project/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── docs/
│   ├── 01-product-vision.md
│   ├── 02-scrum-roles.md
│   ├── 03-epics-user-stories.md
│   ├── 04-product-backlog.md
│   ├── 05-estimation-and-sprints.md
│   ├── 06-scrum-board.md
│   ├── 07-scrum-ceremonies.md
│   ├── 08-framework-comparison.md
│   ├── 09-roadmap-and-burndown.md
│   └── 10-test-plan.md
├── .gitignore
├── LICENSE
└── README.md
```

## Agile documents
The `docs/` directory contains a starter set of planning documents based on the supplied Unit 2 Agile mini-project brief. Update team names, dates, and actual sprint outcomes before submission.

## GitHub upload using VS Code
Create an empty GitHub repository named `Unit-2-Agile-Mini-Project`, then run these commands from the VS Code terminal opened in this folder:

```bash
git init
git add .
git commit -m "Add Unit 2 Agile mini-project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Unit-2-Agile-Mini-Project.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If Git says `remote origin already exists`, use:
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/Unit-2-Agile-Mini-Project.git
git push -u origin main
```

## Academic note
The included documents are project templates and example planning artifacts. Adjust them to match your team’s actual decisions and work. The application implements a small MVP demonstration; it does not implement every capability listed in the brief.
