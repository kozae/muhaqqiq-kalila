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
  if (activePage <= 4) {
    for (let i = 1; i <= 4; i++) {
      pageButtons.push(i);
    }
    pageButtons.push(-1);
    for (let i = totalPages - 1; i <= totalPages; i++) {
      pageButtons.push(i);
    }
    return pageButtons;
  }

  if (activePage >= totalPages - 3) {
    for (let i = 1; i <= 2; i++) {
      pageButtons.push(i);
    }
    pageButtons.push(-1);
    for (let i = totalPages - 3; i <= totalPages; i++) {
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
