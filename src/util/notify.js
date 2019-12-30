export function error (func, message, caption) {
  func({
    color: 'red-5',
    textColor: 'white',
    message,
    caption,
    icon: 'error',
    position: 'top'
  });
}
