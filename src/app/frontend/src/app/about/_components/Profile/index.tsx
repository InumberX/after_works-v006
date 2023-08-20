import Image from 'next/image'
import { STATIC_IMAGE_DIR } from '~/config/env'
import styles from './index.module.scss'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'

export type ProfileProps = {
  certifications: {
    name: string
    url: string
  }[]
  skills: string[]
}

export const Profile = ({ certifications, skills }: ProfileProps) => {
  return (
    <LayoutSection className={styles.Profile}>
      <LayoutInner size='small'>
        <div className={styles.Profile__container}>
          <div className={styles.ProfileTitle}>
            <figure className={styles.ProfileTitleImage}>
              <Image
                src={`${STATIC_IMAGE_DIR}/img-profile.svg`}
                width={80}
                height={80}
                alt='N/NE'
                className={styles.ProfileTitleImage__image}
              />
            </figure>

            <div className={styles.ProfileTitle__paragraph}>
              <h2 className={styles.ProfileTitle__main}>N/NE</h2>

              <span className={styles.ProfileTitle__sub}>（ナイン）</span>
            </div>
          </div>

          <div className={styles.ProfileInfo}>
            <div className={styles.ProfileInfo__contents}>
              <div className={styles.ProfileInfoTitle}>
                <h3 className={styles.ProfileInfoTitle__text}>資格</h3>
              </div>

              <div className={styles.ProfileInfoDescription}>
                <ul className={styles.ProfileInfoDescription__items}>
                  {certifications.map((info, i) => (
                    <li key={i} className={styles.ProfileInfoDescription__item}>
                      <a
                        href={info.url}
                        className={styles.ProfileInfoDescription__link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span className={styles.ProfileInfoDescription__text}>
                          {info.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.ProfileInfo__contents}>
              <div className={styles.ProfileInfoTitle}>
                <h3 className={styles.ProfileInfoTitle__text}>スキル</h3>
              </div>

              <div className={styles.ProfileInfoDescription}>
                <ul className={styles.ProfileInfoDescription__items}>
                  {skills.map((info, i) => (
                    <li key={i} className={styles.ProfileInfoDescription__item}>
                      <span className={styles.ProfileInfoDescription__text}>
                        {info}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
