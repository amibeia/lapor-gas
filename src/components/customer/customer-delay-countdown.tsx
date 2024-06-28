'use client'

import { useEffect, useState } from 'react'

import { TOAST_INFO_BG_COLOR, TOAST_INFO_TEXT_COLOR } from '@/lib/constants'
import { MY_PERTAMINA_DELAY } from '@/lib/my-pertamina'
import { millisecondsToTime, toTwoDigits } from '@/lib/utils'
import { useIsDelayed } from '@/store/layout'

export default function CustomerDelayCountDown() {
	const [duration, setDuration] = useState(MY_PERTAMINA_DELAY)
	const isDelayed = useIsDelayed()

	const { minutes, seconds } = millisecondsToTime(duration)
	const formattedDuration = `${toTwoDigits(minutes)}:${toTwoDigits(seconds)}`

	useEffect(() => {
		const countDown = setInterval(() => {
			if (isDelayed && duration > 0) {
				setDuration((prevState) => prevState - 1000)
			}
		}, 1000)

		return () => {
			clearInterval(countDown)
		}
	}, [isDelayed, duration])

	return (
		<div
			style={{
				color: TOAST_INFO_TEXT_COLOR,
				backgroundColor: TOAST_INFO_BG_COLOR,
			}}
			className="flex h-10 w-[75px] items-center justify-center rounded-md px-4 py-2 text-center font-mono text-sm font-medium"
		>
			{formattedDuration}
		</div>
	)
}
