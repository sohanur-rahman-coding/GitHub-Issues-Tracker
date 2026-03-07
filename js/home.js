let allSec = [];
let openSection = [];
let ClosedSection = [];
const allBtn = document.getElementById("all-taps");
const openBtn = document.getElementById("open-tap");
const closeBtn = document.getElementById("close-tap");
const counter = document.getElementById("issues-count");


// issues counter
const updateCounter = (count) => {
    counter.textContent = `${count} Issues`;
};

// toggle function
const toggleBtn = (id) => {
    allBtn.classList.add("inactive");
    openBtn.classList.add("inactive");
    closeBtn.classList.add("inactive");

    allBtn.classList.remove("active");
    openBtn.classList.remove("active");
    closeBtn.classList.remove("active");

    const clickedBtn = document.getElementById(id);

    clickedBtn.classList.remove("inactive");
    clickedBtn.classList.add("active");
};

// step 1 : feteh all issues

const loadIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayIssues(data.data));
};

// displayIssues
const displayIssues = (data) => {
    data.forEach((element) => {
        allSec.push(element);

        if (element.status === "open") {
            openSection.push(element);
        } else if (element.status === "closed") {
            ClosedSection.push(element);
        }
    });
    showIssues(allSec);
    toggleBtn("all-taps");
    updateCounter(allSec.length);
};

// step 2 display issues

const showIssues = (arr) => {
    const issuesContainer = document.getElementById("issues-container");
    issuesContainer.innerHTML = "";
    updateCounter(arr.length);
    arr.forEach((element) => {
        let priorityColor = "";

        if (element.priority === "high") {
            priorityColor = "bg-red-100 text-red-600";
        } else if (element.priority === "medium") {
            priorityColor = "bg-yellow-100 text-yellow-600";
        } else {
            priorityColor = "bg-green-100 text-green-600";
        }
        const borderTop =
            element.status === "open"
                ? "border-t-4 border-green-500"
                : "border-t-4 border-purple-500";
        const div = document.createElement("div");
        div.innerHTML = `
                        <div onclick='loadIssuesDetails(${element.id})' class="card ${borderTop} bg-base-100 mt-4 p-6 shadow-sm space-y-3 h-full">
                    <div class="card space-y-2">
                        <div class="flex justify-between ">
                            <span>${element.status == "open" ? `<img src="assets/Open-Status.png" alt="">` : `<img src="assets/Closed- Status .png" alt="">`}</span>
                            <p class="rounded-xl outline-1 px-2 ${priorityColor}">${element.priority}</p>
                        </div>
                        <div class="text-left space-y-2">
                            <h2 class="font-bold line-clamp-1">${element.title}</h2>
                            <p class="line-clamp-2">${element.description}</p>
                        </div>
                        <div class="badge-container">
                            <span class="">${element.labels.map((el) => `<span class="mt-4 px-2 pb-[2px] rounded-full bg-yellow-100 border border-yellow-300 text-red-500">${el}</span>`).join(" ")}</span>
                        </div>
                        <hr class="text-gray-300 my-4">
                        <p>by ${element.author}</p>
                        <p>${element.createdAt}</p>
                    </div>
                </div>

        
        
        `;
        issuesContainer.appendChild(div);

    });
};

// step 3  load issues details when i will be clicked

const loadIssuesDetails = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then((res) => res.json())
        .then((details) => displayIssuesDetails(details.data));
};
// step 4 display details

const displayIssuesDetails = (detail) => {
    let priorityColor = "";
    if (detail.priority === "high") {
        priorityColor = "bg-red-100 text-red-600";
    } else if (detail.priority === "medium") {
        priorityColor = "bg-yellow-100 text-yellow-600";
    } else {
        priorityColor = "bg-green-100 text-green-600";
    }
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
  <div class="modal-card space-y-3">

    <h2 class="font-bold text-xl">${detail.title}</h2>

    <div class="flex gap-2 text-sm space-x-4">
      <span class="font-semibold ${detail.status === "open" ? "bg-green-300 text-green-600 px-2 rounded-full" : "bg-purple-300 text-purple-600 px-2 rounded-full"}">${detail.status}</span>
      <span><i class="fa-solid fa-circle text-[8px]"></i>  Opened by <span class="font-semibold">${detail.author}</span> </span>
      <span><i class="fa-solid fa-circle text-[8px]"></i> ${detail.createdAt}</span>
    </div>

    <div>
      ${detail.labels
            .map(
                (el) =>
                    `<span class="px-2 py-1 rounded-full bg-yellow-100 border border-yellow-300 text-red-500">${el}</span>`,
            )
            .join(" ")}
    </div>

    <p class="mt-2 font-semibold">${detail.description}</p>

    <div class="flex justify-start mt-4 bg-[#F8FAFC] p-6 gap-12 ">

      <div>
        <p>Assignee:</p>
        <p class="font-bold">${detail.author}</p>
      </div>

      <div>
        <p>Priority:</p>
        <p class="btn ${priorityColor} rounded-full px-2">${detail.priority}</p>
      </div>

    </div>

  </div>
  `;

    document.getElementById("my_modal_5").showModal();
};
console.log(openSection);
console.log(ClosedSection);
console.log(allSec);

// step 5 show taps

loadIssues();
