# Agent 5: Recruiting Manager

## Context

Recruiters need fast, trustworthy evidence: direction, projects, role, code, outcomes, and contact. The current site has personality but weak hiring conversion.

## Feature Ideas

| Feature | User value | Fit for site | Technical implementation | Cost | Display effect | Risk |
|---|---|---|---|---|---|---|
| Hiring Snapshot | Recruiters understand fit in under a minute. | About and Projects are currently scattered. | Static section or `hire.html` with direction, skills, projects, contact. | Low | Clear hiring entry in nav/first page. | Template-like copy can hurt authenticity. |
| Skill Evidence Matrix | Shows proof for each skill. | Existing posts/projects can serve as evidence. | Structured HTML/JSON with skill, proof, role, recent use. | Medium | Matrix of Backend/AI/Engine/Writing evidence. | Subjective levels must be avoided. |
| Project Case Studies | Shows real problem solving and ownership. | Projects are just links. | Detail pages or expandable homepage cards for SmartLabeling/Yomii. | Medium | Recruiter can evaluate project depth. | Requires real technical details. |
| Code Reading Guide | Tells interviewers which files matter. | GitHub links alone require too much exploration. | Add key-code links and “why inspect this” notes per project. | Low-medium | Guided external code review path. | External repo links can rot. |
| Learning Trajectory | Makes career transition coherent. | “JavaBoy 转行引擎开发中” needs evidence. | Timeline nodes linked to projects/posts. | Medium | Clear progression from Java to engine/AI. | Too much future planning reads as wishlist. |
| Recruiter Reading Paths | Gives curated evidence packages. | Archives have tags but no recommended route. | Static reading path cards linked to existing posts. | Low | “Start here if you are hiring” path. | Some personal posts may be misread in hiring context. |
| Project Proof Gallery | Adds visual proof of real projects. | Current project area lacks screenshots. | Store compressed assets in `assets/projects/`; add gallery. | Medium | Screenshots/flows under project cards. | Asset size and sensitive screenshots. |
| Interview FAQ with Evidence | Pre-answers common recruiter questions. | Personal site can explain motivation and tradeoffs. | Static FAQ, short answers with evidence links. | Low | Structured pre-interview material. | Over-polished answers can feel insincere. |
| Verified Outcomes | Shows what the site/project system already does. | This site itself is a working artifact. | Add “this site is also a project” checklist with file links. | Low | Highlights scripts, imports, Worker, archive, search. | Too much detail becomes a changelog. |

## Recommended Priority

1. Hiring Snapshot
2. Skill Evidence Matrix
3. Project Case Studies
4. Code Reading Guide
5. Verified Outcomes

