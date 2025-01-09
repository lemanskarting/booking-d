export function handleSubmit(
  setSendingStatus,
  values,
  actions,
  config,
  total,
  guests,
  discounts,
  data,
  setStage
) {
  setSendingStatus("sending");

  fetch("/api/sendOrderFinal", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...values,
      config,
      total: total.filter((item) => item.amount > 0),
      guests,
      discounts,
      data,
    }),
  })
    .then((res) => {
      res.status === 200
        ? showSuccess(setSendingStatus, actions, setStage)
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

function showSuccess(setSendingStatus, actions, setStage) {
  setSendingStatus("sent");
  setStage(1);
  setTimeout(() => {
    setSendingStatus("notSending");
    clearForm(setSendingStatus, actions);
  }, 5000);
}

function clearForm(setSendingStatus, actions) {
  actions.resetForm();
  setSendingStatus("notSending");
}
