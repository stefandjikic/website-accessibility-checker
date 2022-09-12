const submit = document.getElementById("url-check");
const submitBtn = document.getElementById('submit-btn');

submit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("website-url").value;
  if (url === "") {
    alert("Please enter URL!");
  } else {
    setLoader(true)
    const res = await fetch(`/api/check?url=${url}`);

    if (res.status !== 200) {
      alert("Something went wrong!");
      setLoader(false);
    } else {
      const data = await res.json();
      console.log(data, "data");
      setLoader(false);
    }
  }
});

const setLoader = (isLoading = false) => {
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Please wait...'
  } else {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Check'
  }
}
