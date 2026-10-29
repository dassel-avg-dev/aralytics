# Aralytics Product Requirements Document

**Version:** 1.1  
**Date:** October 29, 2026  
**Author:** Product team (TBD)  
**Status:** Project-aligned draft; the repository currently contains a frontend prototype, not a production service.

> This document describes the intended product and distinguishes it from what the current prototype actually implements. A screen or demo interaction is not evidence of a production backend capability.

---

## 1. Executive Summary

Aralytics is an AI-supported coding education platform for Philippine schools and Computer Science teachers. It is intended to help students understand mistakes through timely, specific, encouraging diagnostic feedback, while giving teachers a practical view of individual and class-wide learning needs.

The first release targets private schools and individual coding teachers in the Philippines, with high-school Computer Science and Python as the initial learning context. The product has two application roles: **Student** and **Teacher**. School administrators may purchase the service and provision accounts, but an administrator role is not part of the current application prototype.

The repository currently implements a responsive React frontend with 13 routed screens. Sign-in, account activation, data, reports, and AI-related interactions are demo UI only. No product API, durable data store, production authentication, or live AI inference is currently connected.

---

## 2. Problem Statement

Students learning to code often receive feedback that is generic or too late to help them understand a mistake. When they cannot identify which concept or line of reasoning failed, they may lose confidence and stop engaging. Teachers handling large classes cannot always provide individualized feedback or quickly identify the concepts that need reteaching.

Aralytics aims to make useful diagnostic feedback available quickly and give teachers actionable evidence for follow-up, without replacing teacher judgment or exposing students to unnecessary data collection.

---

## 3. Goals, Non-Goals, and Success Measures

### 3.1 Business goals

- **B1:** Validate adoption with private schools and individual teachers in the Philippines.
- **B2:** Establish a sustainable school-focused subscription model; pricing remains undecided.
- **B3:** Consider global expansion only after the Philippine product and operating model are validated.

### 3.2 Product goals

- **G1:** Help students understand errors and improve through timely, personalized feedback.
- **G2:** Reduce routine grading and feedback effort for teachers.
- **G3:** Help teachers identify struggling students and class-wide misconception patterns.
- **G4:** Support coding instruction in classes of different sizes while keeping teachers in control of intervention decisions.

### 3.3 Non-goals for the initial release

- General-purpose learning management system or classroom video platform.
- Third-party single sign-on or classroom integrations.
- Self-service public sign-up; accounts are provisioned by a school or Aralytics administrator.
- A school-administrator application role or parent portal.
- A pre-made quiz/content library. Teachers create and own the learning activities they assign.
- AI mood, emotion, or confidence detection. This feature is explicitly removed from scope for privacy and ethical reasons.
- Filipino/English interface switching in the current product direction. Initial interface and generated feedback are English-first.

---

## 4. Users and Personas

### 4.1 Student — Miguel, 16

High-school student learning Python in a private school in Metro Manila. Miguel wants to know what went wrong, how to reason about a correction, and what to practice next. Generic “good job” or “try again” feedback does not give him enough direction.

### 4.2 Teacher — Mr. Reyes, 35

Computer Science / coding teacher in Quezon City. He needs to create activities, review class and individual results, identify students below a mastery threshold, and decide where personal intervention will help most.

### 4.3 School administrator — Dr. Santos, 50

Principal or academic lead evaluating learning outcomes, teacher workload, student privacy, and subscription value. The administrator is a buyer and account-provisioning stakeholder in the initial scope, not a separate in-product role.

---

## 5. Product Scope and Current Project State

### 5.1 Current frontend routes

| Area | Route | Screen purpose |
|---|---|---|
| Public | `/` | Product landing page and pilot inquiry entry point |
| Authentication | `/login` | Student/Teacher demo login |
| Account activation | `/register` | Institution-code and issued-key activation flow UI |
| Student | `/student/dashboard` | Student home, assigned work, streak/XP and learning overview |
| Student | `/student/activities` | Assigned, remedial, upcoming, and completed activity views |
| Student | `/student/quiz` | Live quiz / coding scenario and answer selection |
| Student | `/student/feedback` | Diagnostic report and practice-drill UI |
| Student | `/student/progress` | Feedback history and progress analytics UI |
| Teacher | `/teacher/dashboard` | Class KPIs, mastery overview, and flagged students |
| Teacher | `/teacher/students` | Student roster and mastery detail UI |
| Teacher | `/teacher/activities` | Activity/quiz management and create-activity drawer |
| Teacher | `/teacher/reports` | Cohort reports and learning analytics UI |
| Teacher | `/teacher/settings` | Classroom, grading, and diagnostic tone settings UI |

### 5.2 Implementation status

| Capability | Current state in this repository |
|---|---|
| Responsive public, student, and teacher screens | Implemented as a React 19 + Vite 8 + Tailwind CSS v4 frontend prototype |
| Login | Demo-only client-side animation and role-based navigation; accepts non-empty credentials and does not authenticate a real account |
| Account activation | Form and demo flow UI; issued-key verification and account creation are not backed by a service |
| Activities, scores, dashboards, reports, and settings | Primarily sample data and client-side interactions; no durable storage or connected product API |
| AI feedback | Sample diagnostic content and UI; no live locally hosted model or inference service is integrated |
| Notifications and exports | UI/demo states only; delivery and production file generation are not implemented |

The backend endpoint map in `NAVIGATION.md` is a plan, not a list of working services. Demo credentials and activation examples in `SETUP.md` are for local development only and must not be used as production credentials.

---

## 6. Functional Requirements

Priorities below describe the intended product. The **current state** notes separately indicate prototype coverage.

### 6.1 Authentication and account management — MVP

- **FR-AUTH-01:** Students and teachers shall sign in with credentials issued by their school or an Aralytics administrator.
- **FR-AUTH-02:** The system shall enforce role-based access: students can access only their own records; teachers can access only their assigned classes and students.
- **FR-AUTH-03:** Account activation may use an institution code and individual access key. It shall not permit unrestricted self-registration.
- **FR-AUTH-04:** Authentication shall use secure server-side sessions or an equivalent approved mechanism, with credential reset and account deactivation procedures defined before launch.
- **Acceptance:** Invalid, expired, or already-used credentials are rejected without exposing whether another user's account exists. Successful sign-in routes users to the correct role home.
- **Current state:** `/login` and `/register` demonstrate the flows only; there is no authentication service, authorization boundary, or persistent session.

### 6.2 Student portal — MVP

- **FR-STU-01:** Show assigned activities with status, due date, class/topic, and an action to start or continue.
- **FR-STU-02:** Show completed activities with score and a link to the associated feedback.
- **FR-STU-03:** Let a student review their own activity details and submitted answers.
- **FR-STU-04:** Present clear empty, loading, and error states when assignments or results cannot be loaded.
- **Current state:** Dashboard and activity screens display representative sample content and client-side navigation.

### 6.3 Quiz and activity engine — MVP

- **FR-ACT-01:** Teachers shall be able to create and edit quizzes/activities using multiple-choice questions and situational or code-scenario multiple-choice questions.
- **FR-ACT-02:** Teachers shall set a title, topic/concept, due date, and target class or individual student before publishing an activity.
- **FR-ACT-03:** Teachers are responsible for authoring the content. The initial product shall not depend on a bundled pre-made content library.
- **FR-ACT-04:** Students shall be able to open an assigned activity, select answers, move between questions, review completion, and submit.
- **FR-ACT-05:** The system shall retain the submitted answer set and submission time for scoring and feedback.
- **Acceptance:** A published activity appears only for its assigned students; a submitted attempt cannot silently lose answers or be counted twice.
- **Current state:** Teacher activity-management and student quiz screens exist. Creation, assignment, and submission are prototype interactions using local state/sample content; no persistence or cross-user synchronization exists.

### 6.4 AI diagnostic and feedback — MVP

- **FR-AI-01:** After submission, the service shall evaluate answers against teacher-defined correct answers and concept tags using a locally hosted, coding-education diagnostic model.
- **FR-AI-02:** Return a score, concepts demonstrated, concepts needing practice, and a concise explanation tailored to the student's answers.
- **FR-AI-03:** Feedback shall be supportive, age-appropriate, understandable in English, and focused on a useful next step. By default, it should guide reasoning rather than provide a complete answer/code solution.
- **FR-AI-04:** Feedback shall be available within five seconds of submission under the agreed pilot load; if generation fails or times out, show a clear retry/fallback state and preserve the submission.
- **FR-AI-05:** Teachers shall be able to view the diagnostic delivered to a student in their class.
- **Safety:** Do not infer mood, emotion, or confidence. Do not use student work to train or improve models without an approved, disclosed, privacy-compliant process.
- **Current state:** Diagnostic reports and settings previews show sample content only. No model, model-serving endpoint, evaluation pipeline, or feedback persistence is connected.

### 6.5 Teacher dashboard and roster — MVP

- **FR-TCH-01:** Show class-level activity participation and performance, including average score and concept-level results.
- **FR-TCH-02:** Identify students below a configurable intervention threshold; the default target threshold is 70% unless the teacher changes it.
- **FR-TCH-03:** Let a teacher open an individual student's permitted scores, progress, and AI feedback.
- **FR-TCH-04:** Provide filters for class, activity/topic, and mastery/intervention status where applicable.
- **FR-TCH-05:** Present data with dates and class context so teachers can distinguish current results from historical trends.
- **Current state:** Dashboard and roster screens render representative class data and offer prototype interactions; server-backed queries, permissions, and real-time updates are not implemented.

### 6.6 Progress, history, and reports — post-MVP data capability

- **FR-PROG-01:** Maintain a student's feedback history and show progress over time by activity and coding concept.
- **FR-PROG-02:** Give teachers class and individual trend views suitable for planning reteaching and intervention.
- **FR-PROG-03:** Reports shall state the reporting period, cohort, and calculation definitions.
- **Current state:** `/student/progress` and `/teacher/reports` prototype these views. Persisted history, verified analytics, and production CSV/PDF exports remain future implementation work.

### 6.7 Notifications — post-MVP

- **FR-NOT-01:** Provide in-app reminders for upcoming due dates and confirmation/encouragement after completion.
- **FR-NOT-02:** Email reminders may be added after consent, delivery, and school configuration requirements are defined.
- **Current state:** Notification indicators and reminder examples are visual/demo UI only; nothing is sent.

### 6.8 Teacher and classroom settings

- Teachers need to manage their profile, assigned cohorts, grading weights, intervention threshold, and diagnostic feedback tone where permitted by school policy.
- Settings changes must be saved, auditable where they affect grading or student treatment, and clearly report save failures.
- **Current state:** `/teacher/settings` displays these controls, but values are not persisted to a service. The production authority model for these settings remains to be defined.

---

## 7. Non-Functional Requirements

### 7.1 Performance

- Student and teacher dashboards should load within three seconds under the agreed pilot network and data volume.
- AI feedback target: within five seconds after submission.
- Measure performance on representative school devices and connections; current frontend build results do not establish production response times.

### 7.2 Scalability

- Architecture target: at least 10,000 concurrent students and 1,000 teachers without unacceptable degradation.
- Use horizontal scaling for stateless application services where appropriate; validate with load tests before claiming this target.
- Current prototype has not been load-tested and does not include a backend architecture.

### 7.3 Security and privacy

- Encrypt student records and credentials in transit and at rest.
- Enforce server-side role and class authorization for every student-data request; hiding a UI control is not authorization.
- Comply with the Philippine Data Privacy Act of 2012 (RA 10173), including appropriate notice, purpose limitation, access controls, retention/deletion rules, and incident handling.
- Define school/teacher authority, guardian or student notices, data retention periods, and model-processing arrangements before pilot data is collected.
- Do not collect biometric, emotional, or inferred-confidence data.
- The current frontend prototype is not suitable for real student personal data.

### 7.4 Usability and accessibility

- Support current desktop and mobile browsers with responsive layouts.
- Keep student feedback encouraging and actionable; keep teacher analytics scannable and tied to clear intervention decisions.
- Support keyboard navigation, visible focus, readable contrast, labels, and reduced-motion preferences.
- Validate accessibility and usability with students and teachers before pilot launch.

### 7.5 Localization

- Initial product interface and model feedback language: English.
- No EN/FIL switcher is present in the current product direction. Any future Filipino localization requires a separate product decision and quality validation.

---

## 8. Success Metrics

### Student engagement

- Weekly active students who complete at least one activity.
- Activity completion rate and median time to completion.
- Student-reported helpfulness of feedback.

### Student learning

- Change in assessment performance over a term.
- Change in mastery by concept (for example, loops, conditionals, and functions).
- Change in the number of students below the agreed passing/intervention threshold.

### Teacher efficiency and adoption

- Weekly active teachers and number of activities created/assigned.
- Teacher-reported time spent grading and preparing interventions before and during the pilot.
- Teacher-reported usefulness of class and student diagnostics.

### Business

- Pilot school adoption, conversion/renewal, monthly and annual recurring revenue, and churn once pricing is approved.

Metric definitions, baselines, collection methods, and targets must be agreed before a pilot. The prototype currently does not collect product analytics or satisfaction surveys.

---

## 9. Assumptions and Dependencies

- Schools and teachers will provide structured quiz content and concept tags.
- Students will engage more when feedback is specific, timely, and supportive.
- A locally hosted model can produce sufficiently accurate, pedagogically sound diagnostics within the performance and cost targets.
- Pilot schools will provide representative activities, consent/notice review, and teacher feedback.
- **Dependencies:** model development and evaluation; backend, database, and secure authentication; teacher content workflow; school partnerships; privacy/legal review; hosting and operations.

---

## 10. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Teachers do not create enough activities | High | Simplify authoring, provide workflow guidance, and measure creation friction; do not assume a content library in MVP. |
| AI feedback is inaccurate or discouraging | High | Evaluate against educator-reviewed examples, show actionable explanations, allow teacher review/flagging, and provide a safe fallback. |
| Student data is exposed to an unauthorized user | High | Server-side authorization, encryption, auditability, privacy review, and security testing before real data is used. |
| Local model hosting is too costly or slow | Medium/High | Benchmark candidate models and realistic class loads before finalizing architecture or service-level claims. |
| Schools adopt slowly | High | Pilot with a small set of schools, validate outcomes, and resolve pricing/onboarding questions before launch. |
| Prototype UI is mistaken for a working service | High | Label demo flows clearly and do not collect real student data until backend safeguards are implemented. |

---

## 11. Roadmap

| Phase | Focus | Exit criteria |
|---|---|---|
| Current | Frontend prototype | 13 public, student, and teacher routes provide a responsive demonstration of intended workflows. This is not the MVP service. |
| MVP foundation | Backend, identity, and data model | Provisioned accounts, role/class authorization, persistent classes, activities, attempts, and audit/security review. |
| MVP learning loop | Author, assign, submit, diagnose | Teacher-created MCQ/scenario activities; student submission; evaluated AI feedback within target; teacher sees permitted results. |
| Pilot | Validate with 2–3 schools | Privacy-approved pilot, load and model-quality evaluation, teacher/student feedback, success metrics baselined. |
| Post-MVP | Notifications and durable analytics/history | In-app reminders, verified progress trends, feedback history, and reliable report exports. |
| Later | Expansion | Revisit gamification, localization, new question types, and global expansion based on pilot evidence. |

Timelines are intentionally not assigned until team capacity, model hosting, and pilot commitments are confirmed.

---

## 12. Open Questions

1. Which local model, serving stack, evaluation dataset, and human review process will be used?
2. Who provisions, resets, and deactivates accounts, and what is the exact invitation-key lifecycle?
3. What subscription model and pilot pricing will schools evaluate?
4. Which classes and teachers will participate in the first pilot, and what data/consent process will they use?
5. Which settings are teacher-controlled versus school-controlled, and who can change grading thresholds or weights?
6. What are the required retention/deletion periods and process for student records and model inputs?
7. Which reporting/export formats are required for the first pilot?
8. When, if ever, should Filipino language support or an administrator application role enter scope?

---

**Document end**
