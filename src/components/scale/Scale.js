import React from 'react'
import styles from './Scale.module.sass'

const Scale = ({value}) => {
    console.log(value)
    const frames = +value.to - +value.from
    const start = +value.total.from - +value.from + 1
    const finish = frames - (+value.to - +value.total.to) + 1

    console.log(`Frames = ${frames}`)
    console.log(`Start = ${start}`)
    console.log(`Finish = ${finish}`)

    let spans = []
    for (let i = +value.from; i <= value.to; i++) {
        spans.push(i)
    }

    return (
        <div className={styles.wrapper}>
            <div style={{
                display: 'grid',
                gridTemplateRows: '30px',
                gridTemplateColumns: `repeat(${frames}, 1fr)`,
                position: 'absolute',
                width: '-webkit-fill-available'
            }
            }>
            <span style={{
                background: 'linear-gradient(rgba(255, 213, 75, 1) -15%, rgba(209, 3, 2, 1) 90%)',
                borderRadius: '20px',
                gridArea: `1 / ${start} / 2 / ${finish}`
            }}
            />
            </div>
            <div className={styles.scale}>
                {spans && spans.map(item => (
                    <span
                        className={styles.scaleSpan}
                        key={item}
                    >{item}</span>
                ))}
            </div>
        </div>
    )
}

export default Scale