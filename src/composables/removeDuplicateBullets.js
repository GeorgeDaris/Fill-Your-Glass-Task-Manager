export function useRemoveDuplicateBullets(parentElement) {
  const container = document.getElementsByClassName(parentElement);

  Array.from(container).forEach((container) => {
    const listItems = container.getElementsByTagName("li");

    Array.from(listItems).forEach((list) => {
      let child = list.firstChild;

      if (child.nodeName !== "INPUT") {
        list.classList.add(
          "list-disc",
          "marker:text-accentColor",
          "marker:shadow-[0.2rem_0.2rem_0_0_red]"
        );

        if (child.firstChild && child.firstChild.nodeName == "INPUT") {
          list.classList.remove("list-disc");
        }
      }

      if (child.nodeName == "UL" || child.nodeName == "OL") {
        console.log("duplicate" + child);
        //   list.classList.remove("list-bullet");
        //   list.classList.remove("list-disc");
        //   list.classList.remove("list-[circle]");
        list.classList.add("list-none");
        //   const childListItems = child.getElementsByTagName("li");

        //   Array.from(childListItems).forEach((child) => {
        //     child.classList.remove("list-disc");
        //     child.classList.add("list-[square]");

        //     const grandChild = child.firstChild;

        //     if (grandChild.nodeName == "UL" || grandhild.nodeName == "OL") {
        //       const grandChildListItems = grandChild.getElementsByTagName("li");

        //       Array.from(grandChildListItems).forEach((list) => {
        //         list.classList.remove("list-[square]");
        //         list.classList.add("list-[circle]");
        //       });
        //     }
        //   });

        //   //   let grandChild = child.firstChild;
        //   //   if (grandChild.nodeName == "UL" || grandChild.nodeName == "OL") {
        //   //     // child.classList.add("list-none");
        //   //     grandChild.classList.remove("list-disc");
        //   //     grandChild.classList.add("list-[square]");
        //   //   }
      }
    });
  });
}
