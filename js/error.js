window.onerror = function(message, source, lineno, colno, error) {
    const errorData = {
      type: 'error',
      message: message,
      source: source,
      line: lineno,
      column: colno,
      stack: error ? error.stack : null,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    console.log("Global error caught:", message);
  
    fetch('/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(() => {
      // Optional: handle failed send, e.g., retry later
    });
  
    // Return false to let the error propagate to the console as usual
    return false;
  };