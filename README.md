# CanadaLaptop — Laptop Repair & Resale CRM

> [!WARNING]
> **DEPRECATED — OLD LEARNING PROJECT (2022, unfinished).** Archived and no longer maintained. Kept public to show my early progress.
> For my current production work see [my GitHub profile](https://github.com/IgorJs2) — Metrocraft 2036 and Stalcraft LAB.

An internal CRM for a laptop repair and refurbishing business, with separate workspaces for admins, sellers and repair technicians. Development stopped at about 60%.

## Features
- Role-based access: admin, seller, worker (roles and permissions modules)
- Laptop inventory, laptop and part models, spare-parts stock
- Orders and invoices
- Kanban task board for technicians (drag and drop)
- Internal chat, messages and notifications
- Email notifications, file uploads, activity log and time tracking

## Tech stack
| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Redux, MUI, React Bootstrap, react-beautiful-dnd, CKEditor |
| Backend | NestJS (≈20 modules), Passport, JWT |
| Database | MongoDB, Mongoose |
