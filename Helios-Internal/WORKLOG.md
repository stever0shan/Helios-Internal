# Helios Internal - Work Log

## Wednesday, March 11, 2026

1. [frontend] Massive feature push across the entire app. Added dark mode toggle in the sidebar using a custom ThemeProvider with localStorage persistence, the Tailwind dark class setup was already there so it just needed the toggle wiring. Also built out full mobile responsive layout with a hamburger menu that slides the sidebar in/out as an overlay on smaller screens.

2. [frontend] Built a notifications dropdown in the top bar header. Bell icon shows the urgent alert count as a red badge, clicking it opens a popover with all the alerts from data.ts. Each alert shows its severity dot color and action hint.

3. [frontend] Added interactive drag-and-drop to the Pipeline Kanban board. Cards are now draggable between columns using native HTML5 DnD. When you drop a card onto a new stage, the job updates locally and fires a toast confirming the move. Drop targets highlight with a dashed border while dragging.

4. [frontend] Replaced the static progress bars on the Reports page with real Recharts visualizations. Added a revenue trend area chart (monthly), borough breakdown bar chart, service type donut/pie chart, and pipeline stage distribution bar chart. All styled to match the app's color system.

5. [frontend] Wired up toast notifications throughout the app. Save buttons in Settings now trigger success toasts, export buttons show confirmation, the Invite Member button on Team tab fires a toast, and the Upload button on Documents gives feedback. Also reduced the toast dismiss delay from 1M ms (basically never) to 4 seconds.

6. [frontend] Enhanced search and filtering on the Customers page with borough and service type dropdown filters alongside the existing text search. Added the same pattern of filter dropdowns that Pipeline already had.

7. [frontend] Made the Scheduling calendar interactive. Clicking a date now filters the upcoming events list to show only events on that date. Event dates are highlighted on the calendar with a green tint. Falls back to showing all upcoming events when no date-specific events exist.

8. [frontend] Added loading skeleton states to every page (Dashboard, Pipeline, Customers, Scheduling, Proposals, Documents, Reports). Each page shows a brief skeleton animation on mount before revealing content, which makes navigation feel more polished.

9. [frontend] Created a login page with pre-filled demo credentials. Uses localStorage to persist auth state. The login form has email/password fields, a show/hide password toggle, and a loading spinner on submit. Logout button added to sidebar.

10. [frontend] Added CSV export buttons to Pipeline, Customers, Reports, Documents, and Proposals pages. Each generates a properly formatted CSV with relevant columns and triggers a download. All show a toast confirmation after export.

11. [frontend] Added a proper SVG favicon with the Helios sun logo (green rounded square with sun rays), replacing the missing favicon.png reference.

12. [frontend] Added a real-time clock on the Dashboard that updates every second, showing date and time in the header. Also made the metrics grid responsive with proper breakpoints for mobile/tablet.
