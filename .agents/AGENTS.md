# Kwizera Zaidi Portfolio Rules & Customizations

This project contains the professional portfolio and resume website of **Kwizera Zaidi**, a Full Stack Developer graduated in Information Systems from the University of Rwanda (Class of 2027). 

## Project Constraints

1. **Visual Theme**:
   - Built with custom vanilla HSL color configurations.
   - The default theme is **pure solid black** (`#000000`) for primary backgrounds, dark slate (`#050505` and `#0a0a0c`) for cards, and pure white for typography.
   - A theme toggle exists in the navbar. Always preserve these contrast values in future styling tweaks.

2. **Resume Details**:
   - **Graduation Class**: expected class of 2027 (University of Rwanda, ICT Department).
   - **Experience Order**: AI integration & workflow specialist first, programming peer tutor second, primary/secondary school tutor third, waiter at Nakka last.
   - **AI workflows**: Pre-populated and highlighted as a core software developer skill.
   - **No Database**: All user updates are local-storage driven. Users can download their configuration JSON from the sync section and commit it to overwrite the default data structure.

3. **Secret Admin Panel Triggers**:
   - The "Admin" editor button is **hidden** from public navbar view.
   - Three secret developer entry shortcuts toggle the admin panel directly (without any passcode prompt):
     - **URL parameter**: Append `?admin=true` or `?edit=true` to the URL.
     - **Double-click**: Double-click the navbar logo (`Kwizera.`) or the footer copyright signature text.
     - **Keyboard Shortcut**: Press `Ctrl + Alt + E` anywhere on the page.

4. **Gmail Integration**:
   - The contact form submissions do not require external email servers or backend configurations.
   - Submitting the contact form redirects the client to a new browser tab with web-based **Gmail Compose** page pre-populated with target email address (`zaidikwizera@gmail.com`), subject, and structured email body context.
