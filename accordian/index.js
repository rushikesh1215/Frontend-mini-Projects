const a = [
  {
    id: 1,
    content: "zxcv",
  },
  {
    id: 2,
    content: "bnmk",
  },
  {
    id: 3,
    content: "awsed",
  },
];
document.addEventListener("DOMContentLoaded", function () {
  let container = document.querySelector(".accordian");

  a.forEach((el) => {
    const section = document.createElement("div");
    section.classList.add("section-acc");

    const header = document.createElement("div");
    header.className = "header";
    header.textContent = `sectionn-${el.id}`;

    const content = document.createElement("div");
    content.className = "content";
    content.textContent = `content=${el.content}`;

    section.appendChild(header);
    section.appendChild(content);
    container.appendChild(section);
  });

  container.addEventListener("click", function (e) {
    let headerClicked = e.target.closest(".header");
    if (!headerClicked) return;

    let section = headerClicked.parentNode;
    console.log(section);
    let isActive = section.classList.contains("active");
    document.querySelectorAll(".section-acc").forEach((el) => {
      el.classList.remove("active");
    });
    if (!isActive) {
      section.classList.add("active");
    }
  });
});
