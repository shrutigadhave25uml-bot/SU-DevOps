# 10. Test Plan

## Test cases
| Test ID | Feature | Test action | Expected result |
|---|---|---|---|
| TC-01 | Student create | Submit all required fields | Student is added and appears in the list |
| TC-02 | Student validation | Submit without name or email | Browser validation prevents invalid submission |
| TC-03 | Student search | Search using part of a name or ID | Matching rows are shown |
| TC-04 | Student update | Edit a saved record | Changes appear without duplicate student |
| TC-05 | Student delete | Confirm delete action | Student and related demo entries are removed |
| TC-06 | Course create | Add a new unique course code | Course card appears |
| TC-07 | Duplicate course | Add an existing code | Duplicate is rejected |
| TC-08 | Attendance | Select statuses and save a date | Attendance records are saved |
| TC-09 | Attendance edit | Change status and save same date | Existing student/date entry is updated |
| TC-10 | Marks validation | Enter score greater than maximum | Entry is rejected |
| TC-11 | Grade calculation | Enter valid marks | Percentage and grade are displayed |
| TC-12 | CSV report | Click Export CSV | A CSV file downloads |
| TC-13 | Persistence | Refresh the browser | Saved demo data remains in the same browser |
| TC-14 | Responsive UI | Use a narrow viewport | Navigation and content remain usable |

## Test notes
Run these tests in your browser and record actual results (Pass/Fail), date, browser, and any defects. Do not report tests as passed unless you have executed them.
