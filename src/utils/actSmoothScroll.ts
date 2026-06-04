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

  let scrollEndTimer: null | ReturnType<typeof setTimeout> = null

  const handleScrollEnd = () => {
    if (scrollEndTimer !== null) {
      clearTimeout(scrollEndTimer)
    }

    scrollEndTimer = setTimeout(() => {
      document.body.classList.remove('Scrolling')
      window.removeEventListener('scroll', handleScrollEnd)
    }, 100)
  }

  window.addEventListener('scroll', handleScrollEnd)
  document.body.classList.add('Scrolling')

  setTimeout(() => {
    window.scrollTo({
      top: targetPosition + winY - 80,
      behavior: 'smooth',
    })
  }, 10)
}
