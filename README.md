# Project description

**EduChat**

This project is the result of team work as part of the project assignment of the course [Programme Engineering](https://www.fer.unizg.hr/predmet/proinz) at the Faculty of Electrical Engineering and Computing, University of Zagreb.

The application "eduChat" will provide students with easier access to information related to their faculties, as well as the possibility of searching for instructions within specific study groups. Its goal is to provide a centralized place to discuss faculty issues and instructional ads, enabling users to find and exchange relevant information more easily.

The eduChat project offers numerous advantages, including: centralized information in a way that it provides a single platform for students to access and share information related to faculties and tutoring services, reducing the time spent searching for relevant resources, enhanced communication and interaction among students, faculty, and tutors, promoting a collaborative educational environment, user engagement when posting ads and providing feedbacks, the application encourages active participation and fosters a sense of community.

> For both frontend and backend developers, we aim to deepen our expertise in React (with TypeScript) for building dynamic user interfaces, Spring Boot (Java) for robust backend development, and PostgreSQL for managing relational databases. Also, we aim to strengthen our skills in Git version control to manage a collaborative codebase. We want to develop skills in structured problem-solving, conflict resolution, and providing constructive feedback to create a productive and supportive team environment.

# Functional requirements

> The functional requirements of the eduChat application define the core features and operations that the system must support to meet the needs of users.
> Registration: Users must be able to create an account by providing an email, username, and password.
> Login: Users must be able to log into the platform using their registered email and password.
> Role-based Access Control: The system will support three distinct user roles with specific permissions.
> Users must have individual profiles where they can: view and update their personal information (email, username, password), view their posted ads and responses and customize the application theme.
> Post Creation: Users can create posts related to faculty-specific questions or instructional ads. Users must be able to select the relevant faculty when creating a post. Also, posts must have a title, description, and optional attachment (e.g., images or files).
> Post Interaction: Users can interact with posts by responding to posts or voting on posts and responses using upvotes or downvotes (positive or negative feedback).
> Post Search: Users must be able to search for posts based on keywords (e.g., faculty name, subject, or topic).
> Flagging Content: Users must be able to flag posts or responses that they find inappropriate.
> Content Review: Faculty administrators and application administrators can review flagged content and take necessary action (e.g., delete or warn users).

# Technologies

For the eduChat project, we chose a client-server architecture with a three-layer structure that consists of:

- Presentation Layer (Frontend) – developed using React with TypeScript in Visual Studio Code
- Application Layer (Backend) – based on the Spring Boot framework (Java), developed in IntelliJ IDEA
- Data Layer (Database) – using PostgreSQL

This architecture provides a clear separation of responsibilities and enables straightforward scalability,
which is crucial for applications like eduChat that serve users with varying roles and permissions.
The client-server architecture simplifies the development, testing, and maintenance of the system since each
layer can be developed and optimized independently. Furthermore, a three-layer structure allows new features
to be added with minimal impact on existing modules, ensuring the flexibility needed for the app’s future
growth and adaptability.

# Team members

> **Team Structure for the eduChat Project**
> Team members: Anamarija Sučić, Hrvoje Dudjak, Matija Ptičar, Filip Grabovac, Matej Stupljanec, Nikola Klepac
> Two Full-Stack Developers:
> Our full-stack developers contribute to both frontend and backend work, helping bridge the gap between the two layers. They play a crucial role in integrating frontend and backend features, ensuring smooth data flow and functionality across the application.
> Two Frontend Developers:
> Dedicated to the Presentation Layer, our frontend developers focus on creating a responsive and user-friendly interface. They handle the design, implementation, and testing of UI components, working closely with the backend to ensure that the client-side features align well with server-side requirements.
> Two Backend Developers:
> They are responsible for core functionalities like authentication, role-based access, and data processing, which are essential for eduChat’s stability and performance.
> Documentation Contributions:
> All team members, regardless of their primary development focus, contribute to the project documentation. Each developer provides insights into their respective areas, ensuring that the documentation is comprehensive and reflects all aspects of the system.

> ## Team functioning:

> To ensure smooth collaboration, productivity, and quality outcomes, the eduChat team will follow the following functioning rules:

> 1. **Clear roles and responsibilities**
>    Each team member has clearly defined role and responsibilities based on their expertise and strengths.
>    Each member will maintain a checklist of tasks and regularly update the team on progress to avoid overlapping responsibilities.
>    nejnkn

> 2. **Version control and code quality standards**
>    All team members must follow version control protocols and adhere to code quality standards to maintain consistency.
>    We are using GitHub for version control, with branches organized by feature and mandatory pull requests to merge code. Also, establish coding standards (naming conventions, documentation practices) and conduct code reviews before merging ensures adherence.

> 3. **Respectful collaboration and Problem solving**
>    All team members foster a respectful and collaborative environment, focusing on constructive problem-solving.

> 4.**Communication Tools and Channels**
> For effective collaboration on the eduChat project, we will rely on Discord as our primary communication platform, with regular live meetings to ensure alignment and problem-solving efficiency.
> We’ve organized specific text channels in Discord for focused conversations on different aspects of the project, such as #front-end, #bac-kend, #database, #time-log and #general. This setup keeps communication organized, allowing team members to quickly find relevant information and discussions.
> For quick, real-time discussions, we will use Discord voice channels. This feature allows us to jump on calls immediately to clarify doubts, resolve issues, or brainstorm ideas without needing to schedule formal meetings.
> In addition to our regular Discord communication, we will hold bi-weekly live meetings in person, improving team cohesion and ensuring that critical decisions are made with everyone’s input.
