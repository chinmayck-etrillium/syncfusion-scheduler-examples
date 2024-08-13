export function applyCategoryColor(args, currentView) {
  let categoryColor = args.data.CategoryColor;
  if (!args.element || !categoryColor) {
    return;
  }
  if (currentView === "Agenda") {
    args.element.firstChild.style.borderLeftColor = categoryColor;
  } else {
    args.element.style.backgroundColor = categoryColor;
  }
}
