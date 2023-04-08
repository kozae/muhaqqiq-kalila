export function getPageButtons(totalPages: number, activePage: number) {
  const pageButtons = [];

  // Case when there are less than 7 pages
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(i);
    }
    return pageButtons;
  }

  // Case when active page is in the first three or last three pages
  if (activePage <= 3) {
    for (let i = 1; i <= 3; i++) {
      pageButtons.push(i);
    }
    pageButtons.push(-1);
    for (let i = totalPages - 1; i <= totalPages; i++) {
      pageButtons.push(i);
    }
    return pageButtons;
  }

  if (activePage >= totalPages - 2) {
    for (let i = 1; i <= 2; i++) {
      pageButtons.push(i);
    }
    pageButtons.push(-1);
    for (let i = totalPages - 2; i <= totalPages; i++) {
      pageButtons.push(i);
    }
    return pageButtons;
  }

  pageButtons.push(1);
  if (activePage > 4) {
    pageButtons.push(-1);
  }

  for (let i = activePage - 1; i <= activePage + 1; i++) {
    pageButtons.push(i);
  }

  if (activePage < totalPages - 3) {
    pageButtons.push(-1);
  }
  pageButtons.push(totalPages);

  return pageButtons;
}

// export function getPageButtons(
//   totalPages: number,
//   activePage: number,
//   minVisibleButtons: number = 7,
//   visibleSiblings: number = 1
// ) {
//   const pageButtons = [];

//   if (totalPages <= minVisibleButtons) {
//     for (let i = 1; i <= totalPages; i++) {
//       pageButtons.push(i);
//     }
//     return pageButtons;
//   }

//   const firstGroup = visibleSiblings + 1;
//   const lastGroup = totalPages - visibleSiblings;

//   if (activePage <= firstGroup) {
//     for (let i = 1; i <= firstGroup + 1; i++) {
//       pageButtons.push(i);
//     }
//     pageButtons.push(-1);
//     for (let i = totalPages - 1; i <= totalPages; i++) {
//       pageButtons.push(i);
//     }
//     return pageButtons;
//   }

//   if (activePage >= lastGroup) {
//     for (let i = 1; i <= 2; i++) {
//       pageButtons.push(i);
//     }
//     pageButtons.push(-1);
//     for (let i = lastGroup - 1; i <= totalPages; i++) {
//       pageButtons.push(i);
//     }
//   }
//   return pageButtons;
// }
