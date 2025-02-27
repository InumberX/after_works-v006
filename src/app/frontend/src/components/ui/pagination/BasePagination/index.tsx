'use client'

import { useMemo, Fragment } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'
import { CircleButton } from '@/components/ui/buttons/CircleButton'
import { SvgIcon } from '@/components/ui/icons/SvgIcon'
import { useI18n } from '@/locales/client'

type Props = {
  className?: string
  currentPage: number
  totalPage: number
  // eslint-disable-next-line no-unused-vars
  handleChangePage: (newPage: number) => void
}

const BasePaginationItem = ({
  currentPage,
  totalPage,
  pageNumber,
  handleChangePage,
  className,
}: {
  currentPage: number
  totalPage: number
  pageNumber: number
  className?: string
  // eslint-disable-next-line no-unused-vars
  handleChangePage: (newPage: number) => void
}) => {
  const t = useI18n()

  return (
    <li
      className={clsx(
        styles.BasePagination__item,
        pageNumber === currentPage && styles['BasePagination__item--current'],
        pageNumber === 1 && styles['BasePagination__item--first'],
        pageNumber === totalPage && styles['BasePagination__item--last'],
        className,
      )}
    >
      {pageNumber === currentPage ? (
        <span className={styles.BasePaginationCurrent}>
          <span className={styles.BasePaginationCurrent__container}>
            <span className={styles.BasePaginationCurrent__text}>
              {pageNumber}
            </span>
          </span>
        </span>
      ) : (
        <CircleButton
          className={styles.BasePagination__button}
          variant='outlined'
          size='small'
          title={t('components.basePagination.buttonText', {
            pageNumber,
          })}
          onClick={() => handleChangePage(pageNumber)}
        >
          <span className={styles.BasePagination__icon}>{pageNumber}</span>
        </CircleButton>
      )}
    </li>
  )
}

export const BasePagination = ({
  className,
  currentPage,
  totalPage,
  handleChangePage,
}: Props) => {
  const t = useI18n()

  const totalPageArray = useMemo(() => {
    return [...(Array(totalPage) as number[])].map((_, i) => i + 1)
  }, [totalPage])

  return (
    <div className={clsx(styles.BasePagination, className)}>
      <div className={styles.BasePagination__container}>
        <ul className={styles.BasePagination__items}>
          <li
            className={clsx(
              styles.BasePagination__item,
              styles['BasePagination__item--prev'],
            )}
          >
            <CircleButton
              className={styles.BasePagination__prev}
              size='small'
              variant='outlined'
              isDisabled={currentPage === 1}
              title={t('components.basePagination.prevButtonText')}
              onClick={() => handleChangePage(currentPage - 1)}
            >
              <SvgIcon
                variant='arrowLeft'
                className={styles.BasePagination__icon}
              />
            </CircleButton>
          </li>

          <>
            {totalPage <= 5
              ? totalPageArray.map((pageNumber) => {
                  return (
                    <BasePaginationItem
                      key={pageNumber}
                      currentPage={currentPage}
                      totalPage={totalPage}
                      pageNumber={pageNumber}
                      handleChangePage={handleChangePage}
                      className='Obj--md Obj--lg Obj--xl'
                    />
                  )
                })
              : totalPageArray.map((pageNumber) => {
                  const isShowPrevSeparator: boolean =
                    pageNumber === totalPage && currentPage <= totalPage - 3
                  const isShowNextSeparator: boolean =
                    pageNumber === 1 && currentPage >= 4
                  const isShowItem: boolean =
                    pageNumber === 1 ||
                    pageNumber === totalPage ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)

                  return (
                    <Fragment key={pageNumber}>
                      {isShowPrevSeparator && (
                        <li
                          className={clsx(
                            styles.BasePagination__item,
                            styles['BasePagination__item--separator'],
                            'Obj--md Obj--lg Obj--xl',
                          )}
                        >
                          <span className={styles.BasePagination__separator} />
                        </li>
                      )}

                      {isShowItem && (
                        <BasePaginationItem
                          currentPage={currentPage}
                          totalPage={totalPage}
                          pageNumber={pageNumber}
                          handleChangePage={handleChangePage}
                          className='Obj--md Obj--lg Obj--xl'
                        />
                      )}

                      {isShowNextSeparator && (
                        <li
                          className={clsx(
                            styles.BasePagination__item,
                            styles['BasePagination__item--separator'],
                            'Obj--md Obj--lg Obj--xl',
                          )}
                        >
                          <span className={styles.BasePagination__separator} />
                        </li>
                      )}
                    </Fragment>
                  )
                })}
          </>

          <>
            {totalPage <= 3
              ? totalPageArray.map((pageNumber) => {
                  return (
                    <BasePaginationItem
                      key={pageNumber}
                      currentPage={currentPage}
                      totalPage={totalPage}
                      pageNumber={pageNumber}
                      handleChangePage={handleChangePage}
                      className='Obj--xs Obj--sm'
                    />
                  )
                })
              : totalPageArray.map((pageNumber) => {
                  const isShowPrevSeparator: boolean =
                    pageNumber === totalPage && currentPage <= totalPage - 2
                  const isShowNextSeparator: boolean =
                    pageNumber === 1 && currentPage >= 3
                  const isShowItem: boolean =
                    pageNumber === 1 ||
                    pageNumber === totalPage ||
                    (pageNumber >= currentPage && pageNumber <= currentPage)

                  return (
                    <Fragment key={pageNumber}>
                      {isShowPrevSeparator && (
                        <li
                          className={clsx(
                            styles.BasePagination__item,
                            styles['BasePagination__item--separator'],
                            'Obj--xs Obj--sm',
                          )}
                        >
                          <span className={styles.BasePagination__separator} />
                        </li>
                      )}

                      {isShowItem && (
                        <BasePaginationItem
                          currentPage={currentPage}
                          totalPage={totalPage}
                          pageNumber={pageNumber}
                          handleChangePage={handleChangePage}
                          className='Obj--xs Obj--sm'
                        />
                      )}

                      {isShowNextSeparator && (
                        <li
                          className={clsx(
                            styles.BasePagination__item,
                            styles['BasePagination__item--separator'],
                            'Obj--xs Obj--sm',
                          )}
                        >
                          <span className={styles.BasePagination__separator} />
                        </li>
                      )}
                    </Fragment>
                  )
                })}
          </>

          <li
            className={clsx(
              styles.BasePagination__item,
              styles['BasePagination__item--next'],
            )}
          >
            <CircleButton
              className={styles.BasePagination__next}
              size='small'
              variant='outlined'
              isDisabled={currentPage >= totalPage || totalPage <= 1}
              title={t('components.basePagination.nextButtonText')}
              onClick={() => handleChangePage(currentPage + 1)}
            >
              <SvgIcon
                variant='arrowRight'
                className={styles.BasePagination__icon}
              />
            </CircleButton>
          </li>
        </ul>
      </div>
    </div>
  )
}
