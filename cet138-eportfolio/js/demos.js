// Dedicated interactions for separate demo pages.
(function () {
  // Full stack flow simulation
  const runFlowBtn = document.getElementById('run-flow-btn');
  const studentName = document.getElementById('flow-name');
  const studentCourse = document.getElementById('flow-course');
  const frontendLog = document.getElementById('frontend-log');
  const backendLog = document.getElementById('backend-log');
  const databaseLog = document.getElementById('database-log');
  const flowResult = document.getElementById('flow-result');

  if (runFlowBtn && studentName && studentCourse && frontendLog && backendLog && databaseLog && flowResult) {
    runFlowBtn.addEventListener('click', () => {
      const name = studentName.value.trim();
      const course = studentCourse.value.trim();

      if (!name || !course) {
        flowResult.textContent = 'Please enter student name and course before running the flow simulation.';
        return;
      }

      frontendLog.innerHTML = '';
      backendLog.innerHTML = '';
      databaseLog.innerHTML = '';
      flowResult.textContent = 'Running simulation...';

      const addLog = (listNode, text) => {
        const item = document.createElement('li');
        item.textContent = text;
        listNode.appendChild(item);
      };

      addLog(frontendLog, `User entered application details for ${name}.`);
      addLog(frontendLog, 'Frontend sent request to server API.');

      setTimeout(() => {
        addLog(backendLog, 'Backend validated required fields.');
        addLog(backendLog, `Backend processed admission request for course: ${course}.`);

        setTimeout(() => {
          addLog(databaseLog, `Record saved: ${name} - ${course}.`);
          addLog(databaseLog, 'Application status stored as: Pending Review.');
          flowResult.textContent = 'Simulation complete: request moved from frontend to backend and into database.';
        }, 550);
      }, 550);
    });
  }

  // Additional JavaScript demo interactions
  const validationForm = document.getElementById('js-demo-form');
  const validationResult = document.getElementById('js-validation-result');

  if (validationForm && validationResult) {
    validationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('js-demo-email');
      const message = document.getElementById('js-demo-message');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.value.trim() || !message.value.trim()) {
        validationResult.textContent = 'Validation failed: both email and message are required.';
        return;
      }

      if (!emailPattern.test(email.value.trim())) {
        validationResult.textContent = 'Validation failed: please provide a valid email format.';
        return;
      }

      validationResult.textContent = 'Validation successful: form data is ready for backend submission.';
      validationForm.reset();
    });
  }
})();
