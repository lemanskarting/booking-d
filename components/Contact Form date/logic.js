export function handleSubmit(
  setSendingStatus,
  setDate,
  values,
  actions,
  config,
  date,
  setIsOpen
) {
  setSendingStatus("sending");

  fetch("/api/sendDate", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...values,
      config,
      date,
    }),
  })
    .then((res) => {
      res.status === 200
        ? showSuccess(setSendingStatus, setDate, actions, setIsOpen)
        : showError();
    })
    .catch(() => {
      showError(setSendingStatus);
    });
}

function showError(setSendingStatus) {
  setSendingStatus("error");
  setTimeout(() => {
    setSendingStatus("notSending");
  }, 5000);
}

function showSuccess(setSendingStatus, setDate, actions, setIsOpen) {
  setSendingStatus("sent");
  setIsOpen(true);
  setTimeout(() => {
    setSendingStatus("notSending");
    clearForm(setSendingStatus, setDate, actions);
  }, 5000);
}

function clearForm(setSendingStatus, setDate, actions) {
  actions.resetForm();
  setSendingStatus("notSending");
  setDate(null);
}
