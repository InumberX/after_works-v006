export const actSmoothScroll = (target: string) => {
  const targetElm: HTMLBodyElement | null =
    target === '#'
      ? document.querySelector('body')
      : document.querySelector(target)

  // スクロール先が存在しない場合
  if (!targetElm) {
    return
  }

  const targetPosition: number = targetElm.getBoundingClientRect().top
  const winY: number = window.pageYOffset || document.documentElement.scrollTop

  window.scrollTo({
    top: targetPosition + winY,
    behavior: 'smooth',
  })
}
