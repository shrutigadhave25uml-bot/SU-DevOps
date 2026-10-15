# 3. Epics, User Stories and Acceptance Criteria

## Epic 1 — Student Management
Purpose: maintain student identity and enrollment records.
- **US-01 Add student:** As an administrator, I want to add a student so that their record is available in the system.
  - Required name, email, course, and year are validated.
  - A unique student ID is assigned.
  - The saved student appears in the list and dashboard.
- **US-02 Search student:** As staff, I want to search students by name, ID, or email so that I can find records quickly.
  - Search filters the visible list as text is entered.
  - Search is case-insensitive.
- **US-03 Update student:** As an administrator, I want to edit a student record so that details stay current.
  - Existing details appear in the form.
  - Saving updates the record without creating a duplicate.
- **US-04 Delete student:** As an administrator, I want to remove a record that is no longer needed.
  - Confirmation is shown before deletion.
  - Related demo attendance and marks are removed.

## Epic 2 — Course Management
- **US-05 Add course:** As an administrator, I want to create courses so that students can be associated with a course.
  - Course name, code, and faculty are required.
  - Duplicate course codes are rejected.
- **US-06 View course details:** As staff, I want to see course details and enrollment count.
  - Each course card displays code, name, faculty, and enrolled count.

## Epic 3 — Attendance Management
- **US-07 Record attendance:** As a faculty member, I want to mark attendance for a date so that attendance records stay updated.
  - A date can be selected.
  - Each student can be marked Present, Absent, or Late.
  - Saving stores one status per student per date.
- **US-08 View attendance summary:** As staff, I want to see a basic attendance rate.
  - Dashboard shows a rate after attendance entries are saved.
  - Present and Late count as attended in this prototype.

## Epic 4 — Marks and Academic Performance
- **US-09 Enter marks:** As faculty, I want to record marks for an assessment so that student performance can be tracked.
  - Student, assessment, score, and maximum marks are required.
  - Score must be between zero and maximum marks.
- **US-10 Calculate grade:** As staff, I want percentages and grade bands to be calculated automatically.
  - Percentage is calculated from score / maximum marks.
  - Grade bands are displayed consistently.

## Epic 5 — Authentication and Security (future)
- **US-11 User login:** As an authorized user, I want to sign in so that access is controlled.
  - Valid credentials are required.
  - Invalid credentials show a safe error.
  - Successful login opens the authorized workspace.
  - Note: not implemented in this front-end demo.

## Epic 6 — Notifications (future)
- **US-12 Attendance alert:** As staff, I want an alert for low attendance so that action can be taken.
  - A threshold can be configured.
  - Students below the threshold are identified.
  - Note: future enhancement.

## Epic 7 — Reporting
- **US-13 Export academic report:** As academic staff, I want to export student performance data so that it can be reviewed or shared.
  - CSV contains student ID, name, email, course, year, assessment count, and average percentage.
  - Export uses current demo records.

## Epic 8 — Dashboard (supporting epic)
- **US-14 View dashboard summary:** As an administrator, I want to see key totals so that I can understand the current workspace at a glance.
  - Student and course totals are displayed.
  - Attendance and mark counts update after records are saved.
