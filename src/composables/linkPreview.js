//creates an iFrame next to links that are inside a specified parent element when the user hovers over them.
export function useLinkPreview(parentElement) {
  const container = document.getElementsByClassName(parentElement);
  const links = container[0].getElementsByTagName("a");

  Array.from(links).forEach((link) => {
    let preview = null;
    const showLinkPreview = () => {
      link.classList.add("relative");
      preview = document.createElement("iframe");
      preview.src = link.href;
      //making it ufocusable to allow for better navigation for keyboard users
      preview.tabIndex = "-1";
      preview.classList.add(
        "absolute",
        "z-[100]",
        "border-[1px]",
        "rounded-md",
        "bg-bgColor",
        "border-lightGrey",
        "shadow-[0rem_0.1rem_1px_0rem_#dcddde,_0rem_0.7rem_0px_-0.3rem_#f9fafa,_0rem_0.7rem_2px_-0.3rem_#dcddde,_0rem_1.3rem_0px_-0.5rem_#f8f8f8,_0rem_1.3rem_2px_-0.5rem_#dcddde]",
        "dark:shadow-[0rem_0.1rem_1px_0rem_#13151b,_0rem_0.7rem_0px_-0.3rem_#1a1d25,_0rem_0.7rem_2px_-0.3rem_#13151b,_0rem_1.3rem_0px_-0.5rem_#171a21,_0rem_1.3rem_2px_-0.5rem_#13151b]",
        "dark:bg-darkBg",
        "dark:border-lightDark",
        "md:h-80",
        "md:w-96",
        "transition-all",
        "duration-700",
        "opacity-0",
        "mt-12"
      );

      //removes the previously created iframe in case the user hovers over and away from the link too quickly
      let sibling = link.nextElementSibling;
      if (sibling && sibling.nodeName == "IFRAME") {
        console.log("This is an iframe");
        sibling.remove();
      }
      link.after(preview);

      //creating the fade-in animation
      setTimeout(() => {
        preview.classList.add("opacity-100", "mt-4");
      }, 300);
    };

    link.addEventListener("mouseover", () => {
      showLinkPreview();
    });

    link.addEventListener("focus", () => {
      showLinkPreview();
    });

    const closePreview = () => {
      preview.classList.remove("opacity-100", "mt-4");
      setTimeout(() => {
        preview.remove();
      }, 300);

      //remove the event listener
      document.body.removeEventListener("mouseover", closePreview, false);
    };

    link.addEventListener("mouseleave", () => {
      document.body.addEventListener("mouseover", (e) => {
        if (e.target !== link && e.target.contains(link)) {
          closePreview();
        }
      });
    });

    link.addEventListener("blur", () => {
      closePreview();
    });
  });
}

// After having spent some time researching this topic, I finally began working on this feature for the archive.

// Wikipedia's use of [page previews](https://diff.wikimedia.org/2018/04/20/why-it-took-a-long-time-to-build-that-tiny-link-preview-on-wikipedia/) is what inspired me to implement it, as I found it could help users navigate links they've added using markdown. It was also something I had been meaning to create for a while, so I felt it could make for another coding challenge.

// ---

// There are many ways to build this feature, one of which would require scraping the specified website to format it to keep the design consistent. This didn't seem like the best approach in my case, so I relied on a simple iframe to render the site.

// ## Implementation

// I created a reusable composable which takes a container element as a parameter to store all the links inside it. This prevents all the site's links from being used, such as those used for navigation which don't need a preview.

// ```
// //creates an iFrame next to links that are inside a specified parent element when the user hovers over them.
// export function useLinkPreview(parentElement) {
//   const container = document.getElementsByClassName(parentElement);
//   const links = container[0].getElementsByTagName("a");
// ```

// After that we create a `showLinkPreview` function to display the iframe for each link:

// ```
// Array.from(links).forEach((link) => {
//     let preview = null;
//     const showLinkPreview = () => {
//       link.classList.add("relative");
//       preview = document.createElement("iframe");
//       preview.src = link.href;
//       //making it ufocusable to allow for better navigation for keyboard users
//       preview.tabIndex = "-1";
//       preview.classList.add(
//         "absolute",
//         "z-[100]",
//         "border-[1px]",
//         "rounded-md",
//         "bg-bgColor",
//         "border-lightGrey",
//         "dark:bg-darkBg",
//         "dark:border-lightDark",
//         "md:h-80",
//         "md:w-96",
//         "transition-all",
//         "duration-700",
//         "opacity-0",
//         "mt-12"
//       );

//       //removes the previously created iframe in case the user hovers over and away from the link too quickly
//       let sibling = link.nextElementSibling;
//       if (sibling && sibling.nodeName == "IFRAME") {
//         console.log("This is an iframe");
//         sibling.remove();
//       }
//       link.after(preview);

//       //creating the fade-in animation
//       setTimeout(() => {
//         preview.classList.add("opacity-100", "mt-4");
//       }, 300);
//     };
// ```

// An iframe is created with the link's href as the the source. To allow for transitions to play we set a `setTimeout` function with a short delay to add the desired classes.

// To make it accessible we call the function on the link for both `mouseover` and `focus` events to account for keyboard users:

// ```
// link.addEventListener("mouseover", () => {
//       showLinkPreview();
//     });

//     link.addEventListener("focus", () => {
//       showLinkPreview();
//     });
// ```

// In order to remove the preview once the user focuses out of the link or moves their mouse outside the link or preview, we create a `closePreview` function and call it on the `mouseleave` and `blur` events:

// ```
// const closePreview = () => {
//       preview.classList.remove("opacity-100", "mt-4");
//       setTimeout(() => {
//         preview.remove();
//       }, 300);

//       //remove the event listener
//       document.body.removeEventListener("mouseover", closePreview, false);
//     };

//     link.addEventListener("mouseleave", () => {
//       document.body.addEventListener("mouseover", (e) => {
//         if (e.target !== link && e.target.contains(link)) {
//           closePreview();
//         }
//       });
//     });

//     link.addEventListener("blur", () => {
//       closePreview();
//     });
// ```

// It is important to remove the event listener from the body, as it will otherwise continue to fire and prevent the preview from opening again.

// I also encountered a bug where the preview would get stuck after hovering over and out of the link too quickly. To prevent this behavior an if statement was used to check whether the link's sibling element is an iframe, in which case the
