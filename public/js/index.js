const submit = document.getElementById("url-check");
const submitBtn = document.getElementById("submit-btn");
const resultsOutput = document.getElementById("results");

submit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("website-url").value;
  if (url === "") {
    alert("Please enter URL!");
  } else {
    setLoader(true);
    const res = await fetch(`/api/check?url=${url}`);

    if (res.status !== 200) {
      alert("Something went wrong!");
      setLoader(false);
    } else {
      const data = await res.json();
      // console.log(data, 'data')
      renderResults(data.issues);
      setLoader(false);
    }
  }
});

const renderResults = (results) => {
  resultsOutput.innerHTML = "";

  if (results?.length === 0) {
    resultsOutput.innerHTML =
      "<h3>No problems found, everything looks fine. ✔️ </h3>";
  } else {
    results.forEach((res) => {
      const output = `
      <div class="card">
        <h3 class="card-heading">${res.message}</h3>
      <p class="code">${parseHTML(res.context)}</p>
      <p class="code-sm">Selector: ${res.selector}</p>
    </div>
      `;
      resultsOutput.innerHTML += output;
    });
  }
};

const setLoader = (isLoading = false) => {
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Please wait...";
  } else {
    submitBtn.disabled = false;
    submitBtn.innerText = "Check";
  }
};
