
You are a senior Angular + Tailwind developer. Generate a fully functional **Angular 16+ project** for an **Internal Tools Dashboard**. This dashboard will be embedded inside a Flutter app using a WebView, served locally (e.g., `http://localhost:4200`).  

---

### **PROJECT REQUIREMENTS**

**1. Project structure**
- Angular 16+ app using standard CLI setup  
- Tailwind CSS fully configured  
- Components must be modular, reusable, and follow best practices  
- Use Angular routing for navigation  
- Provide all `app.module.ts`, `app-routing.module.ts`, and relevant component files

**2. Dashboard Modules / Components**
1. **Sidebar Navigation**
   - Items: Tickets, Knowledgebase, Logs  
   - Responsive, collapsible, Tailwind styling

2. **Ticket Viewer**
   - Table with columns: ID, Subject, Status, Created At  
   - Filters: Open, In Progress, Closed  
   - Dummy data (hard-coded in component or service)  
   - Responsive layout

3. **Knowledgebase Editor**
   - Split view: Markdown editor on left, live preview on right  
   - Save button (no backend needed)  
   - Tailwind-styled textarea, preview panel, header  
   - Optional: basic markdown rendering using a library like `marked`

4. **Live Logs Panel**
   - Simulate real-time logs by appending random log entries every few seconds  
   - Auto-scroll to bottom  
   - Terminal-style monospace font, dark mode background  

---

### **3. Styling**
- Tailwind CSS for all styling  
- Clean, modern layout  
- Light/dark mode support  
- Mobile-responsive (mobile viewport test in browser/dev tools)

---

### **4. Output Requirements**
- Provide full Angular project code: `package.json`, `angular.json`, main component files  
- Include Tailwind config  
- Include clear folder structure  
- Use services where appropriate for dummy data  
- Provide inline comments explaining the code  
- Code must be copy-paste ready and runnable using:
```bash
npm install
ng serve --host 0.0.0.0 --port 4200
