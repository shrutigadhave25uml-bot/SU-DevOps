/* CampusFlow academic management mini-project. Demo data is stored in browser localStorage. */
const STORAGE_KEY = "campusflow_agile_miniproject_v1";
const seed = {
  students: [
    {id:"STU1001",name:"Asha Patil",email:"asha.patil@example.com",course:"CS101",year:"Second Year"},
    {id:"STU1002",name:"Rahul Sharma",email:"rahul.sharma@example.com",course:"CS201",year:"Third Year"},
    {id:"STU1003",name:"Neha Joshi",email:"neha.joshi@example.com",course:"IT101",year:"First Year"},
    {id:"STU1004",name:"Aditya Kulkarni",email:"aditya.k@example.com",course:"CS101",year:"Second Year"}
  ],
  courses: [
    {id:"CS101",name:"Programming Fundamentals",faculty:"Prof. Mehta"},
    {id:"CS201",name:"Data Structures",faculty:"Prof. Deshmukh"},
    {id:"IT101",name:"Web Technologies",faculty:"Prof. Shah"}
  ],
  attendance: [],
  marks: [
    {id:1,studentId:"STU1001",assessment:"Unit Test 1",score:82,max:100},
    {id:2,studentId:"STU1002",assessment:"Assignment 1",score:74,max:100},
    {id:3,studentId:"STU1003",assessment:"Unit Test 1",score:91,max:100}
  ]
};
let data;
try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(seed); } catch { data = JSON.parse(JSON.stringify(seed)); }
const $ = id => document.getElementById(id);
const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function persist(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); renderAll(); }
function toast(message){ const el=$("toast"); el.textContent=message; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),2600); }
function courseName(id){ return data.courses.find(c=>c.id===id)?.name || "Unassigned"; }
function studentName(id){ return data.students.find(s=>s.id===id)?.name || "Unknown student"; }
function initials(name){return name.split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase();}
function grade(p){return p>=90?"A+":p>=80?"A":p>=70?"B":p>=60?"C":p>=40?"D":"F";}
function switchView(view){document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));$("view-"+view).classList.remove("hidden");document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));$("page-title").textContent=({dashboard:"Dashboard",students:"Students",courses:"Courses",attendance:"Attendance",marks:"Marks & Results",reports:"Reports"})[view]||"Dashboard";renderAll();}
function studentRow(s,actions=true){return `<tr><td><div class="person"><span class="person-avatar">${esc(initials(s.name))}</span><span>${esc(s.name)}<small style="display:block;color:#a0a2b4;font-weight:400;margin-top:3px">${esc(s.id)}</small></span></div></td><td>${esc(s.email)}</td><td>${esc(courseName(s.course))}</td><td>${esc(s.year)}</td><td>${actions?`<button class="icon-btn" data-edit-student="${esc(s.id)}" title="Edit">Edit</button><button class="icon-btn danger" data-delete-student="${esc(s.id)}" title="Delete">Delete</button>`:`<span class="pill">Active</span>`}</td></tr>`;}
function renderStudents(){
 const q=($("student-search")?.value||"").toLowerCase(), course=$("course-filter")?.value||"";
 const list=data.students.filter(s=>(!q||[s.name,s.id,s.email].some(v=>v.toLowerCase().includes(q)))&&(!course||s.course===course));
 $("students-table").innerHTML=list.map(s=>studentRow(s)).join("");$("students-empty").classList.toggle("hidden",list.length>0);
 const filter=$("course-filter"), old=filter.value;filter.innerHTML='<option value="">All courses</option>'+data.courses.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("");filter.value=old;
 $("recent-students").innerHTML=data.students.slice(-4).reverse().map(s=>`<tr><td><div class="person"><span class="person-avatar">${esc(initials(s.name))}</span>${esc(s.name)}</div></td><td>${esc(courseName(s.course))}</td><td><span class="pill">Active</span></td></tr>`).join("");
}
function renderCourses(){
 $("course-cards").innerHTML=data.courses.map(c=>`<article class="course-card"><span class="course-code">${esc(c.id)}</span><h3>${esc(c.name)}</h3><p>Faculty: ${esc(c.faculty)}</p><div class="course-footer"><span>${data.students.filter(s=>s.course===c.id).length} enrolled student(s)</span><button class="icon-btn danger" data-delete-course="${esc(c.id)}">Delete</button></div></article>`).join("")||'<article class="panel empty">No courses added yet.</article>';
}
function renderAttendance(){
 const date=$("attendance-date").value || new Date().toISOString().slice(0,10);
 $("attendance-table").innerHTML=data.students.map(s=>{const saved=data.attendance.find(a=>a.studentId===s.id&&a.date===date);return `<tr><td><div class="person"><span class="person-avatar">${esc(initials(s.name))}</span>${esc(s.name)}</div></td><td>${esc(courseName(s.course))}</td><td><select class="attendance-select" data-attendance="${esc(s.id)}"><option ${saved?.status==="Present"?"selected":""}>Present</option><option ${saved?.status==="Absent"?"selected":""}>Absent</option><option ${saved?.status==="Late"?"selected":""}>Late</option></select></td></tr>`;}).join("");
}
function renderMarks(){
 $("marks-table").innerHTML=data.marks.map(m=>{const p=Math.round((m.score/m.max)*100);return `<tr><td>${esc(studentName(m.studentId))}</td><td>${esc(m.assessment)}</td><td>${m.score} / ${m.max}</td><td>${p}%</td><td><span class="pill">${grade(p)}</span></td><td><button class="icon-btn danger" data-delete-mark="${m.id}">Delete</button></td></tr>`;}).join("");$("marks-empty").classList.toggle("hidden",data.marks.length>0);
}
function renderReports(){
 const count=data.attendance.length, present=data.attendance.filter(a=>a.status==="Present"||a.status==="Late").length;
 $("report-students").textContent=$("stat-students").textContent=data.students.length;
 $("report-courses").textContent=$("stat-courses").textContent=data.courses.length;
 $("report-attendance").textContent=count;
 $("stat-attendance").textContent=count?Math.round(present/count*100)+"%":"—";
 $("stat-marks").textContent=data.marks.length;
 const avg=data.marks.length?Math.round(data.marks.reduce((n,m)=>n+m.score/m.max*100,0)/data.marks.length):null;
 $("report-average").textContent=avg===null?"—":avg+"%";
 const rows=data.students.map(s=>{const marks=data.marks.filter(m=>m.studentId===s.id);const p=marks.length?Math.round(marks.reduce((n,m)=>n+m.score/m.max*100,0)/marks.length):0;return {s,p};});
 $("performance-list").innerHTML=rows.map(({s,p})=>`<div class="performance-row"><span>${esc(s.name)}</span><div class="bar"><span style="width:${p}%"></span></div><b>${p? p+"%":"—"}</b></div>`).join("")||'<p class="empty">Add students and marks to view performance.</p>';
}
function renderAll(){renderStudents();renderCourses();renderAttendance();renderMarks();renderReports();fillSelects();}
function fillSelects(){
 const courseOptions=data.courses.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("");
 const sc=$("student-course"), prev=sc.value;sc.innerHTML=courseOptions; if(data.courses.some(c=>c.id===prev))sc.value=prev;
 $("mark-student").innerHTML=data.students.map(s=>`<option value="${esc(s.id)}">${esc(s.name)} (${esc(s.id)})</option>`).join("");
}
function openStudent(s=null){$("student-form").reset();$("student-id").value=s?.id||"";$("student-dialog-title").textContent=s?"Edit student":"Add student";$("student-name").value=s?.name||"";$("student-email").value=s?.email||"";$("student-course").value=s?.course||data.courses[0]?.id||"";$("student-year").value=s?.year||"First Year";$("student-dialog").showModal();}
function openCourse(){ $("course-form").reset(); $("course-dialog").showModal(); }
function openMark(){ if(!data.students.length){toast("Add a student before entering marks.");return;} $("mark-form").reset();$("mark-max").value=100;$("mark-dialog").showModal();}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.go)));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>b.closest("dialog").close()));
$("quick-add").addEventListener("click",()=>openStudent());$("add-student").addEventListener("click",()=>openStudent());$("add-course").addEventListener("click",openCourse);$("add-mark").addEventListener("click",openMark);
$("student-search").addEventListener("input",renderStudents);$("course-filter").addEventListener("change",renderStudents);$("attendance-date").value=new Date().toISOString().slice(0,10);$("attendance-date").addEventListener("change",renderAttendance);
$("student-form").addEventListener("submit",e=>{e.preventDefault();const id=$("student-id").value;const record={id:id||"STU"+(1001+Math.max(0,...data.students.map(s=>Number(s.id.replace(/\D/g,""))-1001))+1),name:$("student-name").value.trim(),email:$("student-email").value.trim(),course:$("student-course").value,year:$("student-year").value};if(!record.name||!record.email||!record.course){toast("Complete all required fields.");return;}if(data.students.some(s=>s.email.toLowerCase()===record.email.toLowerCase()&&s.id!==id)){toast("A student with this email already exists.");return;}if(id)data.students=data.students.map(s=>s.id===id?record:s);else data.students.push(record);$("student-dialog").close();persist();toast(id?"Student updated.":"Student added.");});
$("course-form").addEventListener("submit",e=>{e.preventDefault();const id=$("course-code").value.trim().toUpperCase();if(data.courses.some(c=>c.id===id)){toast("That course code already exists.");return;}data.courses.push({id,name:$("course-name").value.trim(),faculty:$("course-faculty").value.trim()});$("course-dialog").close();persist();toast("Course added.");});
$("mark-form").addEventListener("submit",e=>{e.preventDefault();const score=Number($("mark-score").value),max=Number($("mark-max").value);if(max<=0||score<0||score>max){toast("Marks must be between 0 and the maximum.");return;}data.marks.push({id:Date.now(),studentId:$("mark-student").value,assessment:$("mark-assessment").value.trim(),score,max});$("mark-dialog").close();persist();toast("Marks saved.");});
$("save-attendance").addEventListener("click",()=>{const date=$("attendance-date").value;if(!date){toast("Choose a lecture date.");return;}for(const select of document.querySelectorAll("[data-attendance]")){const studentId=select.dataset.attendance;const existing=data.attendance.find(a=>a.studentId===studentId&&a.date===date);if(existing)existing.status=select.value;else data.attendance.push({studentId,date,status:select.value});}persist();$("attendance-message").textContent="Attendance saved for "+date+"."; $("attendance-message").classList.remove("hidden");toast("Attendance saved.");});
document.addEventListener("click",e=>{const edit=e.target.closest("[data-edit-student]");if(edit){const s=data.students.find(s=>s.id===edit.dataset.editStudent);if(s)openStudent(s);}const del=e.target.closest("[data-delete-student]");if(del){const s=data.students.find(s=>s.id===del.dataset.deleteStudent);if(s&&confirm("Delete "+s.name+"? Related marks and attendance will also be removed.")){data.students=data.students.filter(x=>x.id!==s.id);data.marks=data.marks.filter(m=>m.studentId!==s.id);data.attendance=data.attendance.filter(a=>a.studentId!==s.id);persist();toast("Student deleted.");}}const dc=e.target.closest("[data-delete-course]");if(dc){const id=dc.dataset.deleteCourse;if(data.students.some(s=>s.course===id)){toast("Reassign or remove enrolled students before deleting this course.");return;}if(confirm("Delete this course?")){data.courses=data.courses.filter(c=>c.id!==id);persist();toast("Course deleted.");}}const dm=e.target.closest("[data-delete-mark]");if(dm&&confirm("Delete this mark entry?")){data.marks=data.marks.filter(m=>m.id!==Number(dm.dataset.deleteMark));persist();toast("Mark entry deleted.");}});
$("export-report").addEventListener("click",()=>{const rows=[["Student ID","Student Name","Email","Course","Year","Assessments","Average Percentage"],...data.students.map(s=>{const ms=data.marks.filter(m=>m.studentId===s.id);const avg=ms.length?(ms.reduce((n,m)=>n+m.score/m.max*100,0)/ms.length).toFixed(1):"";return [s.id,s.name,s.email,courseName(s.course),s.year,ms.length,avg];})];const csv=rows.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(",")).join("\r\n");const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));const a=document.createElement("a");a.href=url;a.download="campusflow-academic-report.csv";a.click();URL.revokeObjectURL(url);toast("CSV report exported.");});
renderAll();