const tabs = [
  {
    tabid: 1,
    tabc: " first tab",
  },
  {
    tabid: 2,
    tabc: "second tab",
  },
  {
    tabid: 3,
    tabc: "third tab",
  },
]; 

document.addEventListener("DOMContentLoaded", function () {
      let activetab = tabs[0].tabid;
      let tabcontainer = document.querySelector(".tabcontainer");
      let concontainer = document.querySelector(".concontainer");

      function render() {
        tabs.forEach((t) => {
          // Tab button
          let tab = document.createElement("button");
          tab.className = "buttons";
          tab.id = `tab-${t.tabid}`;
          tab.textContent = `Tab ${t.tabid}`;
          tabcontainer.appendChild(tab);

          // Tab content
          let content = document.createElement("div");
          content.className = "contents";
          content.id = `content-${t.tabid}`;
          content.innerHTML = `<h1>${t.tabc}</h1>`;
          concontainer.appendChild(content);
        });

        // Open the default tab
        opentab(activetab);
      }

      tabcontainer.addEventListener("click", function(event){
        if(event.target.matches(".buttons")){
          const tabid = parseInt(event.target.id.split("-")[1]); // extract numeric ID
          if(tabid !== activetab){
            opentab(tabid);
            activetab = tabid;
          }
        }
      });

      function opentab(tabid){
        const buttons = document.querySelectorAll(".buttons");
        const contents = document.querySelectorAll(".contents");

        buttons.forEach((btn) => {
          btn.classList.remove("active");
        });

        contents.forEach((con) => {
          con.classList.remove("active");
        });

        document.getElementById(`tab-${tabid}`).classList.add("active");
        document.getElementById(`content-${tabid}`).classList.add("active");
      }

      render();
    });