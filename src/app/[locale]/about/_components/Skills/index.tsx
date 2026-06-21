'use client'

import clsx from 'clsx'

import styles from './index.module.css'

import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { SectionTitle } from '~/components/ui/typographies/SectionTitle'
import { useAnimelm, type AnimelmElement } from '~/hooks/use-animelm'
import { useScopedI18n } from '~/locales/client'

export type SkillsProps = {
  qualification: {
    items: {
      text: string
      url: string
    }[]
  }
  skill: {
    items: {
      text: string
    }[]
  }
}

export const Skills = ({ qualification, skill }: SkillsProps) => {
  const { targetRef } = useAnimelm<AnimelmElement>()
  const scopedTQualification = useScopedI18n('about.skills.qualifications')
  const scopedTSkill = useScopedI18n('about.skills.skills')

  return (
    <LayoutSection className={styles.Skills} tag='div'>
      <LayoutInner>
        <div
          className={clsx(styles.Skills__container, 'AnimelmBlurIn')}
          ref={targetRef}
        >
          <section className={styles.SkillsList}>
            <div className={styles.SkillsList__container}>
              <SectionTitle
                subTitle={
                  scopedTQualification('subTitle') !== 'subTitle'
                    ? scopedTQualification('subTitle')
                    : ''
                }
                title={scopedTQualification('title')}
              />
              <ul className={styles.SkillsList__items}>
                {qualification.items.map(
                  (qualification, qualificationIndex) => (
                    <li
                      key={qualificationIndex}
                      className={styles.SkillsList__item}
                    >
                      <a
                        href={qualification.url}
                        className={styles.SkillsList__link}
                        target='_blank'
                      >
                        {qualification.text}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </section>
          <section className={styles.SkillsList}>
            <div className={styles.SkillsList__container}>
              <SectionTitle
                subTitle={
                  scopedTSkill('subTitle') !== 'subTitle'
                    ? scopedTSkill('subTitle')
                    : ''
                }
                title={scopedTSkill('title')}
              />
              <ul className={styles.SkillsList__items}>
                {skill.items.map((skill, skillIndex) => (
                  <li key={skillIndex} className={styles.SkillsList__item}>
                    <p className={styles.SkillsList__paragraph}>{skill.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
