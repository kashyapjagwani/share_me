export const filterPins = (pins, searchTerm) => {
  return pins.filter((pin) => {
    if (
      pin.title.toLowerCase().includes(searchTerm) ||
      pin.about.toLowerCase().includes(searchTerm) ||
      pin.destination.toLowerCase().includes(searchTerm)
    ) {
      return pin;
    }
  });
};
