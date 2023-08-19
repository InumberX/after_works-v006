import { useMemo, Fragment } from 'react'

type Props = {
  text: string
}

export const ReplaceNewLineText = ({ text }: Props) => {
  const texts = useMemo(() => {
    return text.split(/(\n)/).map((item, i) => {
      return <Fragment key={i}>{item.match(/\n/) ? <br /> : item}</Fragment>
    })
  }, [text])

  return <>{texts}</>
}
