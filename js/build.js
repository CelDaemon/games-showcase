/**
 * @type {HTMLSpanElement}
 */
const buildInfoElement = document.querySelector("#build-info");
if(buildInfoElement.dataset.repository) {
    /**
     * @type {string}
     */
    const commit = await (await fetch('/build.txt')).text();
    buildInfoElement.innerHTML = "";
    buildInfoElement.textContent = "Commit ";
    const commitElement = document.createElement("a");
    commitElement.innerText = commit.slice(0, 8);
    commitElement.href = `${buildInfoElement.dataset.repository}/commit/${commit}`;
    buildInfoElement.appendChild(commitElement);
}
