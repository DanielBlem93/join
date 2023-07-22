let categoryDropdownIsOpen = 0
let assingedToDropdownIsOpen = 0

function toggleDropdown(menuClass) {
    const dropdownMenu = document.getElementsByClassName(menuClass)[0];
    if (dropdownMenu.style.height === '51px') {
      dropdownMenu.style.height = '204px';
    } else {
      dropdownMenu.style.height = '51px';
    }
  }
  